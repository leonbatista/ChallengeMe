const jwt = require("jsonwebtoken");
const { JSONTOKEN_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you are not signed in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JSONTOKEN_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "you are not signed in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
    });
    next();
  });
};
