import React, { Component } from 'react'
import {Container, Button} from "reactstrap"
// import QuestionFrom from "../QuestionForm"
import SubmitQuestionForm from '../SubmitQuestionForm'

export default class AddQuestion extends Component {

    

    render() {
        return (
            <Container>
                <SubmitQuestionForm></SubmitQuestionForm>
                <br/>
                <div style = {{textAlign : "center"}}><Button color="danger">Hoàn Thành</Button></div>

            </Container>
        )
    }
}
