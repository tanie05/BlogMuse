const User = require('../models/UserModel')
const router = require('express').Router()

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        res.json(user)
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

//update a user
router.route('/:id').put(async (req,res) => {
    const id = req.params.id;
    const Updatedname = req.body.name
    const profile = req.body.profileImg
    const cover = req.body.coverImg

    try{
      const updatedObject = await User.findByIdAndUpdate(id, {
        name : Updatedname,
        profileImg : profile,
        coverImg: cover,
      });
  
      if(!updatedObject){
        return res.status(404).json({success: false,message: "object not found"})
      }
      return res.json({success: true, message: "updated successfully", updatedObject});

    } catch(err){
      console.log(err);
      return res.status(500).json({success: false, message: "update failed"})
    }
  });


module.exports = router
