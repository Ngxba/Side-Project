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

var question = new Schema({
  model: String,
  QuizQuestionContent: String,
  Answers: [
    {
      order: Number,
      value: String
    }
  ],
  rightAnswer:String,
  essayQuestionContent: String,
  modelEssayQuestionAnswer: String,
  userAnswer : String
});

var takenExam = new Schema({
  grade : String,
  quest : [question],
})

var user = new Schema({
  email: String,
  password : String,
  userInfo : userSchema, // with out email,password
  listClass : [String], // luu id cua class
  takenExam : takenExam , //mot cai schema ve takenexam
})

const User = mongoose.model("User", userSchema);

module.exports = User;
