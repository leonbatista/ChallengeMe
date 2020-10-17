const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const PORT = 3000;

//This can also be exported as module
require("./models/user");

//Parse all incoming json
app.use(express.json());

app.use(require("./routes/auth"));

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Test connection to database
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", (error) => {
  console.log("Error connecting", error);
});

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
