const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

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
  userAnswer : String,
});

var takenTest = new Schema({
    testID: String,
    studentEmail: String,
    studentName: String, 
    quizScore : Number,
    essayScore: Number,
    quest : [question],
  })

const TakenTest = mongoose.model("TakenTest", takenTest);
module.exports = TakenTest;