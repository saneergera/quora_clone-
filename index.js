const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
var sslRedirect = require("heroku-ssl-redirect");

const keys = require("./config/keys.js");
require("./services/facebookoauth.js")();
require("./models/users.js");
require("./models/topics.js");
require("./models/question.js");
require("./models/answer.js");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["abcdefgh"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

mongoose.connect(
  keys.mongooseURI,
  { useNewUrlParser: true }
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sslRedirect());
require("./routes/authentication.js")(app);
require("./routes/quora.js")(app);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  const path = require("path");

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT);
