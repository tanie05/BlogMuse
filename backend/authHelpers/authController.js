const userModel  = require( "../models/UserModel")
const { comparePassword, hashPassword } = require("./authHelper")
const JWT = require( "jsonwebtoken")

const registerController = async (req,res) =>{

    try{
        const {username, password, email, name} = req.body

        if(!username){
            return res.send({success: false, error: "username is required"})
        }
        if(!email){
          return res.send({success: false, error: "email is required"})
        }
        
        if(!password){
            return res.send({success: false, error: "password is required"})
        }
        if(!name){
          return res.send({success: false, error: "name is required"})
        }

        //check user
        const existingUser = await userModel.findOne({username})
        //check existing user
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Already registered please login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({username,password:hashedPassword,email, name}).save()

        res.status(201).send({
            success:true, message: "user registered successfully" , user
        })
        

    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
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
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
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
        },
        token,
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
  
module.exports = {registerController, loginController}
