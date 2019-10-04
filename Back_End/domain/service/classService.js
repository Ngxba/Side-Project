// var Class = require("../model/class");
var newClass = require("../model/newClass");

const classService = {
  // createClass: async (
  //   classCode,
  //   listOfQuizQuest,
  //   listOfEssayQuest,
  //   authedUser
  // ) => {
  //   const result = await Class.findOne({ classCode: classCode });
  //   if (!result) {
  //     const newClass = Class({
  //       classCode: classCode,
  //       listOfQuizQuest: listOfQuizQuest,
  //       listOfEssayQuest: listOfEssayQuest,
  //       authedUser: authedUser
  //     });
  //     await newClass.save();
  //     return newClass;
  //   } else {
  //     throw new Error("Class_EXISTED");
  //   }
  // },
  getClass: async classCode => {
    let result = await newClass.findOne({ classCode: classCode });
    if (result) {
      return result;
    } else {
      throw new Error("error/class_not_found");
    }
  },

  getOwnedClass : async userEmail => {
    let result = await newClass.find({ listOfTeacher : userEmail })
    console.log(result)
    return result
  },

  createNewClass: async (classCode, listOfStudent, teacher) => {
    const result = await newClass.findOne({ classCode: classCode });
    console.log(newClass({classCode: classCode,
      listOfStudent: listOfStudent,
      listOfTeacher: teacher}))
    if (!result) {
      const createdClass = newClass({
        classCode: classCode,
        listOfStudent: listOfStudent,
        listOfTeacher: teacher
      });
      await createdClass.save();
      return createdClass;
    } else {
      throw new Error("Class_EXISTED");
    }
  },

  addStudent: async (classCode, student) => {
    const result = await newClass.updateOne(
      { classCode: classCode },
      {
        $push: {
          listOfStudent: student
        }
      }
    );
    return result;
    // .nModified === 1;
  },
  addTeacher: async (classCode, teacher) => {
    const result = await newClass.updateOne(
      { classCode: classCode },
      {
        $push: {
          listOfTeacher: teacher
        }
      }
    );
    return result.nModified === 1;
  }
};

module.exports = classService;
