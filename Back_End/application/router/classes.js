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
  const classCode = req.query.q
  console.log(classCode)
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

router.post("/getownedclasses", async (req,res) => {
  const userEmail = req.query.q
  try {
    const ownedClasses = await classService.getOwnedClass(userEmail)
    res.json(ownedClasses)
    console.log(ownedClasses)
  }
  catch(err){
    res.status(400);
    res.json({
      err : err.message
    })
  }
})

router.post("/createnewclass", async (req,res)=>{
  const {classCode, listOfStudent, teacher} = req.body;
  try {
    const newClass = await classService.createNewClass(classCode,listOfStudent,teacher);
    res.json(newClass)
  } catch(err) {
    res.status(400);
    res.json({
      err : err.message
    })
  }
})

module.exports = router;
