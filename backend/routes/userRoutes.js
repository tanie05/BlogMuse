const User = require('../models/UserModel')
const router = require('express').Router()
const { requiredSignIn, optionalAuth } = require('../authHelpers/authMiddleware')
const { checkOwnership } = require('../middleware/authorize')

// Get user by ID (public route, but with optional auth for additional data)
router.route('/:id').get(optionalAuth, async (req, res) => {
    try {
        console.log(req.params.id)
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // If user is viewing their own profile, include additional data
        const isOwnProfile = req.user && req.user._id === req.params.id;
        
        res.json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
                savedPosts: isOwnProfile ? user.savedPosts : undefined,
                createdPosts: isOwnProfile ? user.createdPosts : undefined,
                followers: user.followers,
                following: user.following,
                isOwnProfile
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: err.message
        });
    }
});

// Get user by username (public route)
router.route('/username/:username').get(async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
                followers: user.followers,
                following: user.following
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: err.message
        });
    }
});

// Update a user (protected route - only own profile)
router.route('/:id').put(requiredSignIn, checkOwnership('user'), async (req, res) => {
    try {
        const id = req.params.id;
        const { name, profileImg, coverImg, savedPosts, followers, following } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            {
                name,
                profileImg,
                coverImg,
                savedPosts,
                followers,
                following
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Update failed",
            error: err.message
        });
    }
});

module.exports = router
