const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

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
