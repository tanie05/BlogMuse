const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        maxlength: 50,
    },
    content: {
        type: String, 
    },
    cover: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    numberOfSaved: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;