const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

//Get request
router.get("/", (req, res) => {
  res.send("New Text");
});

//Post request
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  //Look for email in database
  User.findOne({ email: email })
    .then((savedUser) => {
      //if found then throw and error and return
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with that email" });
      }
      //Save new user to the database
      const user = new User({
        email: email,
        password: password,
        name: name,
      });
      user
        .save()
        .then((user) => {
          res.json({ message: "User was saved" });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
