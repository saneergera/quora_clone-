const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  Body: String,
  By: String
});

module.exports = userSchema;
