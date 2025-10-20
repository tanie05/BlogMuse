const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true}))
app.use(express.json())
app.use(cookieParser())

const uri = process.env.MONGO_URL
const conn = mongoose.connect(uri, {useNewUrlParser: true});

const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const userListRouter = require('./routes/userListRoutes')
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/lists', userListRouter)


console.log(`MongoDB connection succesfull`)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})
