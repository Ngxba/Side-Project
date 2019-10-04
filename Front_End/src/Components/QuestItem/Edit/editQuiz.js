import React, { Component } from 'react'
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Label,
    Button,
    Input,
    Form,
    FormGroup,
    Alert
} from "reactstrap";
import { Answer } from "../../SubmitQuestionForm/quiz"
import { editQuizQuest } from "../../../Action/editQuest"


export default class editQuiz extends Component {

    preQuiz = {
        Answers: this.props.data.Answers,
        QuizQuestionContent: this.props.data.QuizQuestionContent,
        checked: this.props.data.checked,
        model: this.props.data.model,
        rightAnswer: this.props.data.rightAnswer,
        _id: this.props.data._id
    }
    state = {
        quiz: this.props.data,
        editStatus: true
    }

    onChange = object => {
        this.setState(Object.assign(this.state.quiz, object));
    };

    onChangeAnwser = (order, value) => {
        const answers = [...this.state.quiz.Answers];
        answers[order - 1].value = value;
        this.onChange({
            Answers: answers
        })
    };

    addAnwser = () => {
        const Answers = [...this.state.quiz.Answers,
        {
            order: this.state.quiz.Answers.length,
            value: ""
        }
        ]
        this.onChange({
            Answers: Answers
        })
    };

    deleteAnswer = () => {
        this.state.quiz.Answers.pop();
        this.onChange({
            Answers: this.state.quiz.Answers
        });
    };

    onSubmit = async e => {
        e.preventDefault()
        try {
            await editQuizQuest(
                this.state._id,
                this.state.model,
                this.state.QuizQuestionContent,
                this.state.Answers,
                this.state.rightAnswer
            )
            this.props.onEdit()
        } catch (err) {           
            this.setState({
                editStatus: false
            });
            let alert = document.getElementById("alert")
            alert.scrollIntoView()
            setTimeout(() => {
                this.setState({
                    editStatus: true
                });
            }, 3000);
        }
    }

    render() {
        console.log(this.props.data)
        return (
            <div>
                <Card>
                    <CardBody>
                        {this.state.editStatus === false && (
                            <Alert id="alert" color="danger">
                                <p>CAN NOT EDIT</p>
                                <p>QUESTION ALREADY EXISTED</p>
                            </Alert>
                        )}
                        <CardTitle><h5 style={{ display: "inline-block" }}>
                            Câu hỏi trắc nghiệm số {this.props.numberOfQuest}</h5>
                        </CardTitle>
                        <hr />
                        <CardSubtitle>
                            <h6>
                                <em>Em hãy trả lời câu hỏi sau và chọn một đáp án đúng</em>
                            </h6>
                        </CardSubtitle>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    name="text"
                                    id="quizQuestion"
                                    rows="3"
                                    value={this.state.quiz.QuizQuestionContent}
                                    onChange={event => {
                                        this.onChange({
                                            QuizQuestionContent: event.target.value
                                        });
                                    }}
                                    required={true}
                                />
                                <hr />
                                <CardText>Các đáp án: </CardText>
                                {this.state.quiz.Answers.map(v => (
                                    <Answer
                                        order={v.order + 1}
                                        key={v.order}
                                        value={v.value}
                                        onChangeValue={this.onChangeAnwser}
                                    />
                                ))}
                                <br />
                                <Button
                                    outline
                                    color="secondary"
                                    style={{ marginRight: 5 }}
                                    className="float-right"
                                    type="button"
                                    onClick={this.addAnwser}
                                >
                                    <i className="fas fa-plus"></i>
                                </Button>
                                <Button
                                    outline
                                    style={{ marginRight: 5 }}
                                    color="secondary"
                                    className="float-right"
                                    type="button"
                                    onClick={this.deleteAnswer}
                                >
                                    <i className="fas fa-minus"></i>
                                </Button>
                                <br />
                                <hr />
                                <CardText>
                                    Câu trả lời đúng : {this.state.quiz.rightAnswer}
                                </CardText>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}>
                                    {this.state.quiz.Answers.map(v => (
                                        <span key={this.props.numberOfQuest + v.order}>
                                            <input
                                                type="radio"
                                                name={this.props.numberOfQuest}
                                                onChange={e => this.onChange({
                                                    rightAnswer: v.value
                                                })}
                                                value={v.value}
                                                style={{ marginRight: 10 }}
                                                checked={v.value === this.state.quiz.rightAnswer}
                                                required />
                                            <Label>{v.value}</Label>
                                        </span>
                                    ))}
                                </div>
                                {" "}<Button
                                    outline
                                    type="submit"
                                    className="float-right"
                                    color="success"
                                    style={{ marginRight: 5, borderRadius: 50 }}
                                ><i className="fas fa-check"></i>
                                </Button>
                                <Button
                                    outline
                                    className="float-right"
                                    color="danger"
                                    style={{ marginRight: 5, borderRadius: 50 }}
                                    onClick={() => { this.props.onEdit(); this.onChange(this.preQuiz) }}
                                ><i className="fas fa-times"></i>
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
