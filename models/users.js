const mongoose = require("mongoose");
const { Schema } = mongoose;
const notificationSchema = require("./notifications");

const userSchema = Schema({
  facebook_id: String,
  google_id: String,
  Name: String,
  email: String,
  NewUser: Boolean,
  Topics: [String],
  Profilepic: String,
  Intro: String,
  Answers: [Number],
  Question: [Number],
  Followers: [Number],
  Following: [Number],
  Notifications: [notificationSchema]
});

mongoose.model("Users", userSchema);
