const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  model: String,
  QuizQuestionContent: String,
  Answers: [
    {
      order: Number,
      value: String
    }
  ],
  rightAnswer: String,
  essayQuestionContent: String,
  modelEssayQuestionAnswer: String
});

var authedUser = new Schema({
  userName: String,
  userEmail: String,
  roll: String
});
var classSchema = new Schema({
  classCode: String,
  listOfQuizQuest: [questionSchema],
  listOfEssayQuest: [questionSchema],
  listOfStudent: [String],
  authedUser: authedUser
});

const Class = mongoose.model("class", classSchema);

module.exports = Class;
