const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = require("./comment");

const userSchema = Schema({
  Question: String,
  By: String,
  Answer: String,
  Upvotes: Number,
  Downvotes: Number,
  Comments: [commentSchema],
  UpvoteBy: [String]
});

mongoose.model("Answers", userSchema);
