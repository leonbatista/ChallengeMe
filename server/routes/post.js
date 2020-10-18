const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

//Get all of the post created
router.get("/allposts", (req, res) => {
  Post.find()
    //Extend postedBy to show name and id
    .populate("postedBy", "_id name")
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

module.exports = router;
