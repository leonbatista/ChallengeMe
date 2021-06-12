const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//Connect to database
mongoose.connect(process.env.MONGOURI, {
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

//This can also be exported as module
//Export Schema to be used
require("./models/user");
require("./models/post");

//Parse all incoming json
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

//Greetings from heroku
app.get('/',(req,res) => {
  res.send("ChallengeMe API")
})

app.listen(process.env.PORT, () => {
  console.log("server is running on", process.env.PORT);
});
