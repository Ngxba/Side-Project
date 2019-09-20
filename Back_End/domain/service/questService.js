var Question = require("../model/question");

const questService = {
  pushQuiz: async (
    model,
    QuizQuestionContent,
    answerContentA,
    answerContentB,
    answerContentC,
    answerContentD
  ) => {
    const result = await Question.findOne({
      QuizQuestionContent: QuizQuestionContent
    });
    if (!result) {
      const newQuest = Question({
        model,
        QuizQuestionContent,
        answerContentA,
        answerContentB,
        answerContentC,
        answerContentD
      });
      await newQuest.save();
      return newQuest;
    } else {
      throw new Error("QUESTION_QUIZ_EXISTED");
    }
  },
  pushEssayQuest: async (model, essayQuestionContent, modelEssayQuestionAnswer) => {
    let result = await Question.findOne({ essayQuestionContent: essayQuestionContent});
    if (!result) {
        const newQuest = Question({
          model,
          essayQuestionContent,
          modelEssayQuestionAnswer,
        });
        await newQuest.save();
        return newQuest;
      } else {
        throw new Error("QUESTION_ESSAY_EXISTED");
      }
  }
};

module.exports = questService;
