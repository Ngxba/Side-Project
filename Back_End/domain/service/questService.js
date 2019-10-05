var Question = require("../model/question");
var newClass = require("../model/newClass");

const questService = {
  getQuest: () => {
    return Question.find({});
  },
  pushQuiz: async (model, QuizQuestionContent, Answers, rightAnswer) => {
    const result = await Question.findOne({
      model: model,
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
      model: model,
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
  },
  delQuest: async questIDs => {
    await Question.deleteMany({ _id: { $in: questIDs } });
  },
  editEssay: async (
    questID,
    model,
    essayQuestionContent,
    modelEssayQuestionAnswer
  ) => {
    let result = await Question.findOne({
      model,
      essayQuestionContent
    });
    if (result === null || result._id.toString() === questID) {
      const essay = await Question.findById(questID);
      essay.essayQuestionContent = essayQuestionContent;
      essay.modelEssayQuestionAnswer = modelEssayQuestionAnswer;
      await essay.save();
    } else {
      throw new Error("QUESTION_ESSAY_EXISTED");
    }
  },
  editQuiz: async (
    questID,
    model,
    QuizQuestionContent,
    Answers,
    rightAnswer
  ) => {
    let result = await Question.findOne({
      model,
      QuizQuestionContent
    });
    if (result === null || result._id.toString() === questID) {
      const quiz = await Question.findById(questID);
      quiz.QuizQuestionContent = QuizQuestionContent;
      quiz.Answers = Answers;
      quiz.rightAnswer = rightAnswer;
      await quiz.save();
    } else {
      throw new Error("Question_QUIZ_EXISTED");
    }
  },
};

module.exports = questService;
