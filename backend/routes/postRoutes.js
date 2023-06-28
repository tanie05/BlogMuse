const router = require('express').Router()
const Post = require('../models/PostModel')

//view all posts
router.route('/').get((req,res) => {
    Post.find()
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json(err))
})

//create a post
router.route('/:username').post(async (req,res) => {
    try{
        const {title,author,desc,content,cover} = req.body;
        const newPost = await new Post({title,author,desc,content,cover}).save();
        res.status(201).send({
            success:true, message: "Post created successfully"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in creation',
            err
        })
    }
})

//fetch a single post
router.route('/:id').get((req,res) => {
    const id = req.params.id;
    Post.findById(id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
})

//delete a post
router.route('/:id').delete((req,res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
    .then(() => res.json("Post deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
})

//editing a post
router.route('/:id').put(async (req,res) => {
    const id = req.params.id;
    const updateTitle = req.body.title;
    const updateDescription = req.body.description;
    const updateContent = req.body.content;
    const updateNumberOfSaved = req.body.numberOfSaved;
  
    try{
      const updatedObject = await Post.findByIdAndUpdate(id, {
        title: updateTitle,
        description: updateDescription,
        content: updateContent ,
        numberOfSaved : updateNumberOfSaved
      });
  
      if(!updatedObject){
        return res.status(404).json({success: false,message: "object not found"})
      }
      return res.json({success: true, message: "updated successfully"});

    } catch(err){
      console.log(err);
      return res.status(500).json({success: false, message: "update failed"})
    }
  });



module.exports = router