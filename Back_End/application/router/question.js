var express = require("express");
var router = express.Router();
var questService = require("../../domain/service/questService");
router.post("/", async (req, res) => {
  const model = req.body.model;
  if (model === "quiz") {
    const { QuizQuestionContent, Answers, rightAnswer } = req.body;
    try {
      const quiz = await questService.pushQuiz(
        model,
        QuizQuestionContent,
        Answers,
        rightAnswer
      );
      res.json(quiz);
    } catch (err) {
      res.status(400);
      res.json({
        err: err.message
      });
    }
  }
   else if(model === "essay"){
      const {essayQuestionContent, modelEssayQuestionAnswer} = req.body;
      try {
          const quiz = await questService.pushEssayQuest(model,essayQuestionContent, modelEssayQuestionAnswer) ;
          res.json(quiz);
        } catch (err) {
          res.status(400);
          res.json({
            quiz: err.message
          });
        }
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
