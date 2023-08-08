const router = require('express').Router()
const User = require('../models/UserModel')
const Post = require('../models/PostModel')

router.route('/:username').get((req,res) => {
    const authorName = req.params.username
    let result = []
    Post.find()
    .then((post) => {
        const allPosts = post;
        for(var i = 0 ; i<allPosts.length; i++){
            if(allPosts[i].author === authorName){
                result.push(allPosts[i]);
            }
        }
        res.json(result);
    })
    .catch((err) => res.status(400).json(err))
})

router.route('/saved/:id').get(async (req,res) => {
    const id = req.params.id;
    
    User.findById(id)
    .then(user => {
        const savedPostIds = user.savedPosts; // Array of saved post IDs

        // Retrieve posts based on savedPostIds
        Post.find({ _id: { $in: savedPostIds } })
        .then(posts => {
            res.json(posts) // Output: Array of posts matching the savedPostIds
        })
        .catch(error => {
            console.error(error);
        });
    })
    .catch(error => {
        console.error(error);
    });



})
router.route('/followers/:id').get(async (req,res) => {
    const id = req.params.id;
    
    User.findById(id)
    .then(user => {
        const followersNames = user.followers; // Array of followers names
        res.json(followersNames);

    })
    .catch(error => {
        console.error(error);
    });
})

router.route('/following/:id').get(async (req,res) => {
    const id = req.params.id;
    
    User.findById(id)
    .then(user => {
        const followingUsersNames = user.followers; // Array of followers names
        res.json(followingUsersNames);

    })
    .catch(error => {
        console.error(error);
    });
})

module.exports = router