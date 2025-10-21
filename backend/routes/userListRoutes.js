const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/UserModel')
const Post = require('../models/PostModel')
const { requiredSignIn, optionalAuth } = require('../authHelpers/authMiddleware')

// Helper function to populate author field with username
const populateAuthorField = async (posts) => {
    for (let post of posts) {
        // Check if author field is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(post.author)) {
            try {
                const user = await User.findById(post.author);
                if (user) {
                    post.author = user.username;
                }
            } catch (err) {
                console.log('Error fetching user for post author:', err);
            }
        }
    }
    return posts;
};

// Get posts by username (public route)
router.route('/:username').get(async (req, res) => {
    try {
        const authorName = req.params.username;
        const limit = parseInt(req.query.limit) || 12;
        const offset = parseInt(req.query.offset) || 0;
        
        // First, try to find the user by username to get their ID
        const user = await User.findOne({ username: authorName });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Search for posts where author is either the username or the user ID
        const posts = await Post.find({ 
            $or: [
                { author: authorName },
                { author: user._id.toString() }
            ]
        })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);
        
        // Populate author field with username if it's an ID
        const populatedPosts = await populateAuthorField(posts);
        
        const totalPosts = await Post.countDocuments({ 
            $or: [
                { author: authorName },
                { author: user._id.toString() }
            ]
        });
        const hasMore = offset + limit < totalPosts;
        
        res.json({
            success: true,
            posts: populatedPosts,
            hasMore,
            totalPosts,
            currentOffset: offset,
            nextOffset: hasMore ? offset + limit : null
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error fetching user posts",
            error: err.message
        });
    }
});

// Get saved posts for a user (public route)
router.route('/saved/:id').get(optionalAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const limit = parseInt(req.query.limit) || 12;
        const offset = parseInt(req.query.offset) || 0;
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        const savedPostIds = user.savedPosts;
        
        if (savedPostIds.length === 0) {
            return res.json({
                success: true,
                posts: [],
                hasMore: false,
                totalPosts: 0,
                currentOffset: 0,
                nextOffset: null
            });
        }
        
        // Filter out invalid ObjectIds to prevent casting errors
        const validPostIds = savedPostIds.filter(id => {
            try {
                return mongoose.Types.ObjectId.isValid(id);
            } catch (err) {
                return false;
            }
        });
        
        if (validPostIds.length === 0) {
            return res.json({
                success: true,
                posts: [],
                hasMore: false,
                totalPosts: 0,
                currentOffset: 0,
                nextOffset: null
            });
        }
        
        // Retrieve posts based on valid savedPostIds with offset
        const posts = await Post.find({ _id: { $in: validPostIds } })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);
        
        // Populate author field with username if it's an ID
        const populatedPosts = await populateAuthorField(posts);
        
        const totalPosts = validPostIds.length;
        const hasMore = offset + limit < totalPosts;
        
        res.json({
            success: true,
            posts: populatedPosts,
            hasMore,
            totalPosts,
            currentOffset: offset,
            nextOffset: hasMore ? offset + limit : null
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error fetching saved posts",
            error: err.message
        });
    }
});

// Get followers for a user (public route)
router.route('/followers/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        
        const user = await User.findById(id).select('followers');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.json({
            success: true,
            followers: user.followers
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error fetching followers",
            error: err.message
        });
    }
});

// Get following for a user (public route) - Fixed the bug here
router.route('/following/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        
        const user = await User.findById(id).select('following');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.json({
            success: true,
            following: user.following
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error fetching following",
            error: err.message
        });
    }
});

module.exports = router