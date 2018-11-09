const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  facebook_id: String,
  google_id: String,
  email: String,
  NewUser: Boolean,
  Topics: [String],
  Profilepic: String,
  Intro: String,
  Answers: [Number],
  Question: [Number],
  Followers: [Number],
  Following: [Number],
  Topics: [Number],
  Notifications: [String]
});

mongoose.model("Users", userSchema);
