const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/profile/:userId",requireLogin,(req,res)=>{
    User.findById({_id: req.params.userId})
    .select("-password")
    .then(user => {
        Post.find({postedBy:req.params.userId})
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                return res.json({user, posts})
            }
        })
    })
    .catch(err => {
        return res.status(404).json({error: "User not found"})
    })
})

router.put("/follow", requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{new:true}).select("-password")
        .then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })

    })
})


router.put("/unfollow", requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{new:true}).select("-password")
        .then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
        
    })
})


router.put("/changeProfilePic",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.userId,{
        profilePic: req.body.profilePic
    })
    .then(result =>{
        res.json(result)
        console.log("Picture Changed Successfully");
      })
})

router.put("/profilePic",requireLogin,(req,res)=>{
    User.findById(req.body.userId)
    .then(result => {
        res.json(result)
    })
})

router.post("/findUser",(req,res)=>{
    let findingUser = new RegExp("^"+req.body.query)
    User.find({name:{$regex:findingUser,
    $options: "i"
    }})
    .then(user => {
        res.json({user})
    }).catch(err=> {
        console.log(err);
    })
})

module.exports = router;