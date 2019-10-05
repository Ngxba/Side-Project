const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var authedUser = new Schema({
  userName: String,
  userEmail: String,
  roll: String
});
var testSchema = new Schema({
  classCode: String,
  listOfQuizQuest: [String],
  listOfEssayQuest: [String],
  listOfStudent: [String],
  authedUser: authedUser
});


const Test = mongoose.model("Test", testSchema);

module.exports = Test;