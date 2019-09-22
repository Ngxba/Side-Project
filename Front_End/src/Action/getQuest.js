import axios from "axios";

export const getQuiz = async () => {
    const res = await axios.get(`http://localhost:5000/question`);
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get question", res)
    }
}