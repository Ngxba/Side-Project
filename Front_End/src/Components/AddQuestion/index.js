import React, { Component } from 'react'
import {Container, Button} from "reactstrap"
// import QuestionFrom from "../QuestionForm"
import SubmitQuestionForm from '../SubmitQuestionForm'
import {addQuiz, addEssayQuest} from "../../Action/addQuestion"

export default class AddQuestion extends Component {
    submitQuiz = async (quizData) => {
        const {model, QuizQuestionContent, Answers, rightAnswer} = quizData;
        await addQuiz(model, QuizQuestionContent, Answers, rightAnswer)
    }

    submitEssayQuestion = async (essayQuestData) => {
        const {model, essayQuestionContent, modelEssayQuestionAnswer} = essayQuestData;
        await addEssayQuest(model, essayQuestionContent, modelEssayQuestionAnswer)
    }

    render() {
        return (
            <Container>
                <SubmitQuestionForm submitQuiz = {this.submitQuiz} submitEssayQuestion = {this.submitEssayQuestion}></SubmitQuestionForm>
                <br/>
                <div style = {{textAlign : "center"}}><Button color="danger">Hoàn Thành</Button></div>
                
            </Container>
        )
    }
}
