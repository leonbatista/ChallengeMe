const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  following:[{
    type:ObjectId,
    ref:"User"
  }],
  followers:[{
    type:ObjectId,
    ref:"User"
  }],
  profilePic: {
    type: String,
  },
});

mongoose.model("User", userSchema);
