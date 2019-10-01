

export const editQuest = (questIDs, essayQuestionContent, modelEssayQuestionAnswer) => {
    const res = await Axios.post(`http://localhost:5000/question/edit`, {
        questIDs, essayQuestionContent, modelEssayQuestionAnswer
    })
    if (res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot edit question", res)
    }
}