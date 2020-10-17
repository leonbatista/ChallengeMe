const express = require("express");
const app = express();
const PORT = 3000;

//This is a default route
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
