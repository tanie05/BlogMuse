const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String, 
        required: true,
        unique: true
    }, 
    name: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true,
    },
    profileImg: {
        type: String ,
        default: ""
    },
    coverImg: {
        type: String,
        default: ""
    },
    savedPosts: [{type: String}],
    createdPosts: [{type: String}]

}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User;