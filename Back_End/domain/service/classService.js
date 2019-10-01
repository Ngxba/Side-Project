var Class = require("../model/class");

const classService = {
  createClass: async (classCode, listOfQuizQuest, listOfEssayQuest, authedUser) => {
    const result = await Class.findOne({ classCode: classCode });
    if (!result) {
      const newClass = Class({
        classCode : classCode,
        listOfQuizQuest: listOfQuizQuest, 
        listOfEssayQuest : listOfEssayQuest,
        authedUser : authedUser,
      });
      await newClass.save();
      return newClass;
    } else {
      throw new Error("Class_EXISTED");
    }
  },
  getClass : async (classCode)=>{
    console.log(classCode)
    let result = await Class.findOne({classCode : classCode})
    if(result){
        return result;
    }
    else{

        throw new Error("error/class_not_found")
    }
    
  }
};

module.exports = classService;
