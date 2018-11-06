const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "Hello" });
});

require("./routes/authentication.js")(app);
app.listen(3000);
