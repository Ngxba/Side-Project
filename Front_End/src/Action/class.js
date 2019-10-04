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
    console.log(classCode)
    const res = await axios.post(`http://localhost:5000/class?q=${classCode}`)
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get class", res)
    }
}

export const getOwnedClass = async (roll, userEmail) => {
    const res = await axios.post(`http://localhost:5000/class/getownedclasses?q=${userEmail}`)
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get class", res)
    }
}

export const createNewClass = async (classCode, listOfGivenStudent, teacher) => {
    const listOfStudent = []
    listOfGivenStudent.map(student => listOfStudent.push(student.value))
    const res = await axios.post(`http://localhost:5000/class/createnewclass`, {
        classCode, listOfStudent, teacher
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create class", res)
    }
}