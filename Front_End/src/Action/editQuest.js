import Axios from "axios"

export const editEssayQuest = async (questID, model, essayQuestionContent, modelEssayQuestionAnswer) => {
    const res = await Axios.post(`http://localhost:5000/question/edit`, {
        questID, model, essayQuestionContent, modelEssayQuestionAnswer
    })
    if (res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot edit question", res)
    }
}