const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  Name: String,
  Question: [String],
  Followers: [String]
});

mongoose.model("Topics", userSchema);
