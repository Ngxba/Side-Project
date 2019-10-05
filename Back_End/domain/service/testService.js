var Test = require("../model/test")

const testService = {
    createTest: async (
        classCode,
        listOfQuizQuest,
        listOfEssayQuest,
        authedUser
    ) => {
        // const result = await Test.findOne({ classCode: classCode });
        try {
            const newTest = Test({
                classCode: classCode,
                listOfQuizQuest: listOfQuizQuest,
                listOfEssayQuest: listOfEssayQuest,
                authedUser: authedUser
            });
            await newTest.save();
            return newTest;
        } catch(err) {
            throw new Error("Class_EXISTED");
        }
    },
}

module.exports = testService