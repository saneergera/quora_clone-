const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  Question: String,
  By: [String],
  Answer: [String],
  Followers: [String],
  Topics: [String],
  Ask: []
});

mongoose.model("Questions", userSchema);
