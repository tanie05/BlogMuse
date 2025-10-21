const router = require('express').Router()
const User = require('../models/UserModel')
const Post = require('../models/PostModel')
const { requiredSignIn, optionalAuth } = require('../authHelpers/authMiddleware')

// Get posts by username (public route)
router.route('/:username').get(async (req, res) => {
    try {
        const authorName = req.params.username;
        
        // Use efficient query instead of fetching all posts
        const posts = await Post.find({ author: authorName }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            posts
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
                posts: []
            });
        }
        
        // Retrieve posts based on savedPostIds
        const posts = await Post.find({ _id: { $in: savedPostIds } }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            posts
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