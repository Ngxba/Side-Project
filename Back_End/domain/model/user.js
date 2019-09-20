const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  name : String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
