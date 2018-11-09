const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  Name: String,
  Question: [Number],
  Followers: [Number]
});

mongoose.model("Topics", userSchema);
