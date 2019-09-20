import React, { Component } from 'react'
import {Container} from "reactstrap"
// import QuestionFrom from "../QuestionForm"
import SubmitQuestionForm from '../SubmitQuestionForm'

export default class AddQuestion extends Component {
    render() {
        return (
            <Container>
                <SubmitQuestionForm></SubmitQuestionForm>
            </Container>
        )
    }
}
