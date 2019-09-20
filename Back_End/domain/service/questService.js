var Question = require("../model/question");

const questService = {
  pushQuiz: async (model, QuizQuestionContent, Answers, rightAnswer) => {
    const result = await Question.findOne({
      model : model,
      QuizQuestionContent: QuizQuestionContent
    });
    if (!result) {
      const newQuest = Question({
        model,
        QuizQuestionContent,
        Answers,
        rightAnswer
      });
      await newQuest.save();
      return newQuest;
    } else {
      throw new Error("QUESTION_QUIZ_EXISTED");
    }
  },
  pushEssayQuest: async (
    model,
    essayQuestionContent,
    modelEssayQuestionAnswer
  ) => {
    let result = await Question.findOne({
      model : model,
      essayQuestionContent: essayQuestionContent
    });
    if (!result) {
      const newQuest = Question({
        model,
        essayQuestionContent,
        modelEssayQuestionAnswer
      });
      await newQuest.save();
      return newQuest;
    } else {
      throw new Error("QUESTION_ESSAY_EXISTED");
    }
  }
};

module.exports = questService;
