import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardText,
    Button,
    Input,
} from "reactstrap";
import { editEssayQuest } from "../../../Action/editQuest"

export default class editEssay extends Component {
    preEssay = {
        Answers: this.props.data.Answers,
        checked: this.props.data.checked,
        essayQuestionContent: this.props.data.essayQuestionContent,
        model: this.props.data.model,
        modelEssayQuestionAnswer: this.props.data.modelEssayQuestionAnswer,
        _id: this.props.data._id
    }
    state = {
        essay: this.props.data
    }

    onChange = object => {
        this.setState(Object.assign(this.state.essay, object));
    };

    onSubmit = async () => {
        await editEssayQuest(
            this.state.essay._id,
            this.state.essay.model,
            this.state.essay.essayQuestionContent,
            this.state.essay.modelEssayQuestionAnswer
        )
    }


    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h5 style={{ display: "inline-block" }}>
                                Câu hỏi số {this.props.numberOfQuest}
                            </h5>
                        </CardTitle>
                        <hr />
                        <CardSubtitle>
                            <h6><em>Em hãy đọc câu hỏi sau đây và trả lời :</em></h6>
                            <Input
                                type="textarea"
                                name="text"
                                id="essayQuestion"
                                rows="3"
                                value={this.state.essay.essayQuestionContent}
                                onChange={event => {
                                    this.onChange({
                                        essayQuestionContent: event.target.value
                                    });
                                }}
                                required={true}
                            />
                        </CardSubtitle>
                        <hr />
                        <CardText>Câu trả lời mẫu : </CardText>
                        <Input
                            type="textarea"
                            name="text"
                            id="essayQuestion"
                            rows="3"
                            value={this.state.essay.modelEssayQuestionAnswer}
                            onChange={event => {
                                this.onChange({
                                    modelEssayQuestionAnswer: event.target.value
                                });
                            }}
                            required={true}
                        />
                        <br />
                        {" "}<Button
                            outline
                            className="float-right"
                            color="success"
                            style={{ marginRight: 5, borderRadius: 50 }}
                            onClick={() => { this.props.onEdit(); this.onSubmit() }}
                        ><i className="fas fa-check"></i>
                        </Button>
                        <Button
                            outline
                            className="float-right"
                            color="danger"
                            style={{ marginRight: 5, borderRadius: 50 }}
                            onClick={() => { this.props.onEdit(); this.onChange(this.preEssay) }}
                        ><i className="fas fa-times"></i>
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
