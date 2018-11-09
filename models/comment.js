const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  Comment: String,
  By: String
});

module.exports = userSchema;
