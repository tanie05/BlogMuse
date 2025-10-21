const userModel  = require( "../models/UserModel")
const { comparePassword, hashPassword } = require("./authHelper")
const JWT = require( "jsonwebtoken")

const registerController = async (req,res) =>{

    try{
        const {username, password, email, name} = req.body

        if(!username){
            return res.send({success: false, error: "username is required", alreadyExists: false})
        }
        if(!email){
          return res.send({success: false, error: "email is required", alreadyExists: false})
        }
        
        if(!password){
            return res.send({success: false, error: "password is required", alreadyExists: false})
        }
        if(!name){
          return res.send({success: false, error: "name is required", alreadyExists: false})
        }

        //check user
        const existingUser = await userModel.findOne({username})
        //check existing user
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Already registered please login",
                alreadyExists: true
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({username,password:hashedPassword,email, name}).save()

        // Generate token for new user
        const token = await JWT.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        
        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? undefined : 'localhost' // Only set domain in production
        });

        res.status(201).send({
            success:true, 
            message: "user registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                savedPosts: user.savedPosts,
                createdPosts: user.createdPosts,
            }
        })
        

    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            alreadyExists: false,
            err

        })
    }
}

//POST LOGIN
const loginController = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid username or password",
        });
      }

      const user = await userModel.findOne({username});
      
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "user is not registerd",
        });
      }

      const match = await comparePassword(password, user.password);

      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }

      //token
      const token = await JWT.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      
      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? undefined : 'localhost' // Only set domain in production
      });
      
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          username: user.username,
          name: user.name,
          savedPosts: user.savedPosts,
          createdPosts: user.createdPosts,
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  }; 

//LOGOUT
const logoutController = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? undefined : 'localhost'
        });
        
        res.status(200).send({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in logout",
            error
        });
    }
};

//GET CURRENT USER
const getCurrentUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password');
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        
        res.status(200).send({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
                savedPosts: user.savedPosts,
                createdPosts: user.createdPosts,
                followers: user.followers,
                following: user.following
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching user",
            error
        });
    }
};
  
module.exports = {registerController, loginController, logoutController, getCurrentUserController}
