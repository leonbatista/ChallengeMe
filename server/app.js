const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const PORT = 3000;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", (error) => {
  console.log("Error connecting", error);
});

//This is a default route
app.get("/", (req, res) => {
  res.send("New File");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
