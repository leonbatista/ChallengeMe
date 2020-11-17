const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

//Get all of the post created
router.get("/allposts", requireLogin, (req, res) => {
  Post.find()
    //Extend postedBy to show name and id
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Route to create a new post
router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, video } = req.body;
  if ((!title, !body, !video)) {
    res.status(422).json({ error: "Please add all require fields" });
  }
  //Makes sure the password is not saved on the database
  req.user.password = undefined;
  const post = new Post({
    title: title,
    body: body,
    video: video,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Upgrade request
router.put("/like",requireLogin,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    //append the value to an array in mongodb
    $push:{likes:req.user._id}
  }, {
    //return documnet after changes
    new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    else{
      res.json(result)
    }
  })
})

//Upgrade request
router.put("/unlike",requireLogin,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    //removes all instances of the object in mongodb
    $pull:{likes:req.user._id}
  }, {
    //return documnet after changes
    new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    else{
      res.json(result)
    }
  })
})


router.put("/comment",requireLogin,(req,res)=>{
  const comment = {
    text:req.body.text,
    postedBy:req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId,{
    //append the value to an array in mongodb
    $push:{comments:comment}
  }, {
    //return documnet after changes
    new:true
  })
  .populate("comments.postedBy","_id name")
  .populate("postedBy","_id name")
  .exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    else{
      res.json(result)
    }
  })
})

module.exports = router;
