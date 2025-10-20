const JWT = require("jsonwebtoken") 
const userModel = require("../models/UserModel") ;

/**
 * Middleware to verify JWT token from HTTP-only cookies
 * Sets req.user with decoded token data
 */
const requiredSignIn = async(req,res,next) => {
    try{
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }
        
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    
    }
    catch(err){
        console.log(err);
        
        // Handle specific JWT errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });
        }
        
        return res.status(401).json({
            success: false,
            message: "Authentication failed."
        });
    }
}

/**
 * Optional authentication middleware
 * Doesn't fail if no token is provided, but sets req.user if token is valid
 */
const optionalAuth = async(req,res,next) => {
    try{
        const token = req.cookies.token;
        
        if (!token) {
            req.user = null;
            return next();
        }
        
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    
    }
    catch(err){
        // For optional auth, we don't fail on invalid tokens
        req.user = null;
        next();
    }
}

/**
 * Middleware to check if user is authenticated and active
 * Should be used after requiredSignIn
 */
const checkUserActive = async(req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please login again."
            });
        }

        // Add user data to request
        req.userData = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error verifying user status.",
            error: error.message
        });
    }
}

module.exports = {
    requiredSignIn,
    optionalAuth,
    checkUserActive
}