const router = require('express').Router()
const Post = require('../models/PostModel')
const User = require('../models/UserModel')
const { requiredSignIn, optionalAuth } = require('../authHelpers/authMiddleware')
const { checkOwnership } = require('../middleware/authorize')

// Helper function to populate author field with username
const populateAuthorField = async (posts) => {
    const mongoose = require('mongoose');
    
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

// View all posts (public route with optional auth)
router.route('/').get(optionalAuth, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 12;
        const offset = parseInt(req.query.offset) || 0;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);

        // Populate author field with username if it's an ID
        const populatedPosts = await populateAuthorField(posts);

        const totalPosts = await Post.countDocuments();
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
            message: "Error fetching posts",
            error: err.message
        });
    }
});

// Create a post (protected route)
router.route('/').post(requiredSignIn, async (req, res) => {
    try {
        const { title, desc, content, cover } = req.body;
        
        // Get author from authenticated user
        const author = req.user.username;
        
        const newPost = await new Post({
            title,
            author,
            desc,
            content,
            cover
        }).save();
        
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error creating post",
            error: err.message
        });
    }
});

// Fetch a single post (protected route - requires login)
router.route('/:id').get(requiredSignIn, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        
        // Populate author field with username if it's an ID
        const populatedPosts = await populateAuthorField([post]);
        
        res.json({
            success: true,
            post: populatedPosts[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error fetching post",
            error: err.message
        });
    }
});

// Delete a post (protected route - only author can delete)
router.route('/:id').delete(requiredSignIn, checkOwnership('post'), async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        
        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        
        res.json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error deleting post",
            error: err.message
        });
    }
});

// Update a post (protected route - only author can update)
router.route('/:id').put(requiredSignIn, checkOwnership('post'), async (req, res) => {
    try {
        const { title, desc, content, numberOfSaved } = req.body;
        
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                desc,
                content,
                numberOfSaved
            },
            { new: true, runValidators: true }
        );
        
        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        
        res.json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error updating post",
            error: err.message
        });
    }
});

// Save a post (protected route)
router.route('/:id/save').post(requiredSignIn, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        
        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        
        // Get user and check if post is already saved
        const User = require('../models/UserModel');
        const user = await User.findById(userId);
        
        if (user.savedPosts.includes(postId)) {
            return res.status(400).json({
                success: false,
                message: "Post already saved"
            });
        }
        
        // Add post to user's saved posts
        await User.findByIdAndUpdate(userId, {
            $push: { savedPosts: postId }
        });
        
        // Increment post's save count
        await Post.findByIdAndUpdate(postId, {
            $inc: { numberOfSaved: 1 }
        });
        
        res.json({
            success: true,
            message: "Post saved successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error saving post",
            error: err.message
        });
    }
});

// Unsave a post (protected route)
router.route('/:id/unsave').post(requiredSignIn, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        
        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        
        // Get user and check if post is saved
        const User = require('../models/UserModel');
        const user = await User.findById(userId);
        
        if (!user.savedPosts.includes(postId)) {
            return res.status(400).json({
                success: false,
                message: "Post not saved"
            });
        }
        
        // Remove post from user's saved posts
        await User.findByIdAndUpdate(userId, {
            $pull: { savedPosts: postId }
        });
        
        // Decrement post's save count
        await Post.findByIdAndUpdate(postId, {
            $inc: { numberOfSaved: -1 }
        });
        
        res.json({
            success: true,
            message: "Post unsaved successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error unsaving post",
            error: err.message
        });
    }
});

module.exports = router