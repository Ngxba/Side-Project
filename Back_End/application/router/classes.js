var express = require("express");
var router = express.Router();
var classService = require("../../domain/service/classService");

router.post("/create", async (req, res) => {
  const { classCode, listOfQuizQuest, listOfEssayQuest,  authedUser} = req.body;
  try {
    const newClass = await classService.createClass(
      classCode,
      listOfQuizQuest,
      listOfEssayQuest,
      authedUser
    );
    res.json(newClass);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message
    });
  }
});

router.post("/", async (req,res) => {
  const {classCode} = req.body;
  try {
    const takenClass = await classService.getClass(classCode)
    res.json(takenClass)
  }
  catch(err){
    res.status(400);
    res.json({
      err : err.message
    })
  }
})

module.exports = router;
