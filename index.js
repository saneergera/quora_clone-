const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

require("./routes/authentication.js")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT);
