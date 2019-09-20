const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    model : String,
    QuizQuestionContent: String,
    answerContentA: String,
    answerContentB: String,
    answerContentC: String,
    answerContentD: String,
    essayQuestionContent: String,
    modelEssayQuestionAnswer: String,
});

const Question = mongoose.model("Question", userSchema);

module.exports = Question;