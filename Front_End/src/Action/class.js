import axios from "axios";

export const createClass = async (classCode, listOfQuizQuest, listOfEssayQuest ,authedUser) => {
    const res = await axios.post(`http://localhost:5000/class/create`, {
        classCode, listOfQuizQuest, listOfEssayQuest, authedUser
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create test", res)
    }
}

export const getClass = async (classCode) => {
    const res = await axios.post(`http://localhost:5000/class`, {classCode});
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot take test", res)
    }
}