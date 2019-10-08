var Test = require("../model/test")

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
    }
}

module.exports = testService