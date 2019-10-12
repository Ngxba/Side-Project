var Test = require("../model/test")
var TakenTest = require("../model/takenTest")

const testService = {
    createTest: async (
        classCode,
        title,
        description,
        listOfQuizQuest,
        listOfEssayQuest,
        authedUser
    ) => {
        // const result = await Test.findOne({ classCode: classCode });
        try {
            const newTest = Test({
                classCode: classCode,
                title: title,
                description: description,
                listOfQuizQuest: listOfQuizQuest,
                listOfEssayQuest: listOfEssayQuest,
                authedUser: authedUser
            });
            await newTest.save();
            return newTest;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getTest: async (classCode) => {
        result = await Test.find({classCode})
        if (result) {
            return result
        } else {
            throw new Error("no test found")
        }
    },
    deleteTest: async (testID) => {
        await Test.deleteOne({ _id: testID})
    },
    addTakenTest: async (testID, studentEmail, quizScore, quest) => {
        try {
            const newTakenTest = TakenTest({
                testID, 
                studentEmail, 
                quizScore, 
                quest
            })
            await newTakenTest.save()
            return newTakenTest
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = testService