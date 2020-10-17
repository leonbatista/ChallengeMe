const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

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
      bcrypt.hash(password, 16).then((encryptedpassword) => {
        const user = new User({
          email: email,
          password: encryptedpassword,
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
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
