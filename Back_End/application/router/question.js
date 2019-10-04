var express = require("express");
var router = express.Router();
var questService = require("../../domain/service/questService");
router.post("/", async (req, res) => {
  const model = req.body.model;
  if (model === "quiz") {
    const { QuizQuestionContent, Answers, rightAnswer } = req.body;
    try {
      const quiz = await questService.pushQuiz(
        model,
        QuizQuestionContent,
        Answers,
        rightAnswer
      );
      res.json(quiz);
    } catch (err) {
      res.status(400);
      res.json({
        err: err.message
      });
    }
  }
   else if(model === "essay"){
      const {essayQuestionContent, modelEssayQuestionAnswer} = req.body;
      try {
          const quiz = await questService.pushEssayQuest(model,essayQuestionContent, modelEssayQuestionAnswer) ;
          res.json(quiz);
        } catch (err) {
          res.status(400);
          res.json({
            err: err.message
          });
        }
  }
});

router.get("/", async (req, res) => {
  const result  = await questService.getQuest();
  const listQuest = result.map(questModel => questModel );
  res.json(listQuest);
})

router.post("/delete", async (req, res) =>{
    const {questIDs} = req.body
    await questService.delQuest(questIDs)
    res.json({
        success: true
    })
})

router.post("/edit", async (req, res) =>{
    const {questID, model, essayQuestionContent, modelEssayQuestionAnswer, QuizQuestionContent, Answers, rightAnswer} = req.body
    if (model === "essay") {
        try{
            await questService.editEssay(questID, model, essayQuestionContent, modelEssayQuestionAnswer)
            res.json({
                success: true
            })
        } catch (err) {
            res.status(400)
            res.json({
                err: err.message
            })
        }
    } else if (model === "quiz") {
        try {
            await questService.editQuiz(questID, model, QuizQuestionContent, Answers, rightAnswer)
            res.json({
                success: true
            })
        } catch (err) {
            res.status(400)
            res.json({
                err: err.message
            })
        }
    }
    
})
    
module.exports = router;

