const userModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');

/**
 * Middleware to check if user owns the resource
 * @param {string} resourceType - 'user' or 'post'
 * @param {string} paramName - name of the parameter containing the resource ID (default: 'id')
 */
const checkOwnership = (resourceType, paramName = 'id') => {
    return async (req, res, next) => {
        try {
            const resourceId = req.params[paramName];
            const userId = req.user._id;

            if (resourceType === 'user') {
                // Check if user is trying to access their own profile
                if (resourceId !== userId) {
                    return res.status(403).json({
                        success: false,
                        message: "Access denied. You can only access your own profile."
                    });
                }
            } else if (resourceType === 'post') {
                // Check if user is the author of the post
                const post = await PostModel.findById(resourceId);
                if (!post) {
                    return res.status(404).json({
                        success: false,
                        message: "Post not found."
                    });
                }
                if (post.author !== req.user.username) {
                    return res.status(403).json({
                        success: false,
                        message: "Access denied. You can only modify your own posts."
                    });
                }
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error checking ownership.",
                error: error.message
            });
        }
    };
};

/**
 * Middleware to check if user exists and is active
 */
const checkUserExists = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Add user data to request for use in subsequent middleware
        req.userData = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error checking user existence.",
            error: error.message
        });
    }
};

/**
 * Middleware to check if user has permission to perform admin actions
 * (For future use when implementing admin roles)
 */
const requireAdmin = (req, res, next) => {
    // For now, we'll implement basic admin check
    // In the future, you can add a role field to the user model
    if (req.user && req.user.username === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin privileges required."
        });
    }
};

/**
 * Middleware to check if user can follow/unfollow another user
 */
const checkFollowPermission = async (req, res, next) => {
    try {
        const targetUserId = req.params.id;
        const currentUserId = req.user._id;

        // Users cannot follow themselves
        if (targetUserId === currentUserId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself."
            });
        }

        // Check if target user exists
        const targetUser = await userModel.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        req.targetUser = targetUser;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error checking follow permission.",
            error: error.message
        });
    }
};

module.exports = {
    checkOwnership,
    checkUserExists,
    requireAdmin,
    checkFollowPermission
};
