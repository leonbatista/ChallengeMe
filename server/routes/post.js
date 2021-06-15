const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

// This is going to be  used for an explore page
//Get all of the post created
router.get("/allposts", requireLogin, (req, res) => {
  Post.find()
    //Extend postedBy to show name and id
    .populate("postedBy", "_id name profilePic")
    .populate("comments.postedBy", "_id name profilePic")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/followingPosts", requireLogin, (req, res) => {
  Post.find({postedBy:{$in:req.user.following}})
    //Extend postedBy to show name and id
    .populate("postedBy", "_id name profilePic")
    .populate("comments.postedBy", "_id name profilePic")
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
  })
  .populate("comments.postedBy","_id name profilePic")
  .populate("postedBy","_id name profilePic")
  .exec((err,result)=>{
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
  })
  .populate("comments.postedBy","_id name  profilePic")
  .populate("postedBy","_id name  profilePic")
  .exec((err,result)=>{
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
    //  $push:{comments:comment}
    $push:{
      //Place the comment at the begining of the array of comments
      comments: {
        $each: [comment],
        $position:0
      }
    }
  }, {
    //return documnet after changes
    new:true
  })
  .populate("comments.postedBy","_id name profilePic")
  .populate("postedBy","_id name profilePic")
  .exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    else{
      res.json(result)
    }
  })
})

router.delete("/deletepost/:postId",requireLogin,(req,res) =>{
  Post.findOne({_id:req.params.postId})
  .populate("postedBy","_id")
  .exec((err,post)=>{
    if(err|| !post){
      return res.status(422).json({error:err})
    }
    if(post.postedBy._id.toString() === req.user._id.toString()){
        post.remove()
        .then(result =>{
          res.json(result)
        }).catch(err=>{
          console.log(err);
        })
    }
  })

})

router.put("/deletecomment",requireLogin,(req,res)=>{
    const comment = {
      _id: req.body.commentId
    }
    Post.findByIdAndUpdate({_id: req.body.postId},{
      $pull:{comments:comment}
    }, {
      new:true
    })
    //populate retains information on call, in this case we keep person who posted comment and their profile name
    .populate("comments.postedBy","_id name  profilePic")
    .populate("postedBy","_id name  profilePic")
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
