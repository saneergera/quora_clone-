const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  Body: String,
  Link: String,
  Read: Boolean
});

module.exports = userSchema;
