const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jsontoken = require("jsonwebtoken");
// const { JSONTOKEN_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");
mongoose.set('useFindAndModify', false);

//Post request
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields." });
  }
  //Look for email in database
  User.findOne({ email: email })
    .then((savedUser) => {
      //if found then throw and error and return
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with that email." });
      }
      //hash the password on the database
      bcrypt.hash(password, 16).then((encryptedpassword) => {
        const user = new User({
          email: email,
          password: encryptedpassword,
          name: name,
          following: [],
          followers: []
        });
        //Save new user to the database
        user
          .save()
          .then((user) => {
            res.json({ message: "User was saved" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//Sign in route
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please enter both email and password." });
  }
  //Check if the email is found in the database
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res
        .status(422)
        .json({ error: "Username and password are invalid." });
    }
    //Compares if the passwords hashes to the same password in database
    bcrypt
      .compare(password, savedUser.password)
      .then((passwordMatched) => {
        if (passwordMatched) {
          const token = jsontoken.sign(
            { _id: savedUser._id },
            process.env.JSONTOKEN_SECRET
          );
          const { _id, name, email,following, followers} = savedUser;
          res.json({ token: token, user: { _id, name, email,following, followers} });
        } else {
          res.status(422).json({ error: "Username and password are invalid." });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
