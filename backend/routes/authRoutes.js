const express =  require("express");
const {registerController, loginController, logoutController, getCurrentUserController} = require('../authHelpers/authController')
const {requiredSignIn} = require('../authHelpers/authMiddleware')

const router = express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.post('/logout', logoutController)

router.get('/me', requiredSignIn, getCurrentUserController)

module.exports = router 
