var express = require("express");
var router = express.Router();
var classService = require("../../domain/service/classService");
var testService = require("../../domain/service/testService")

router.post("/createTest", async (req, res) => {
  const { classCode, title, description, listOfQuizQuest, listOfEssayQuest,  authedUser} = req.body;
  try {
    const newTest = await testService.createTest(
      classCode,
      title,
      description,
      listOfQuizQuest,
      listOfEssayQuest,
      authedUser
    );
    res.json(newTest);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message
    });
  }
});

router.get("/getTest", async (req, res) => {
  const classCode = req.query.q
  try {
    const testList = await testService.getTest(classCode)
    res.json(testList)
  } catch (err) {
    res.status(400)
    res.json({
      err: err.message
    })
  }
})

router.post("/deleteTest", async (req, res) => {
  const {testID} = req.body
  try {
    await testService.deleteTest(testID)
    res.json({
      success: true
    })
  } catch (err) {
    res.status(400)
    res.json({
      err: err.message
    })
  }
})

router.post("/addTakenTest", async (req, res) => {
  const {testID, studentEmail, quizScore, quest} = req.body
  try {
    await testService.addTakenTest(testID, studentEmail, quizScore, quest)
    res.json({
      success: true
    })
  } catch (err) {
    res.status(400)
    res.json({
      err: err.message
    })
  }
})

router.post("/", async (req,res) => {
  const classCode = req.query.q
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
  const userRoll = req.body.roll
  try {
    if(userRoll === "Teacher"){
      const ownedClasses = await classService.getOwnedClass(userEmail)
      res.json(ownedClasses)
    }
    else if(userRoll === "Student"){
      const enrolledClass = await classService.getEnrolledClass(userEmail)
      res.json(enrolledClass)
    }
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
