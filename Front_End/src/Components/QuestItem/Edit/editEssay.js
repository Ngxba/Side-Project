import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardText,
    CustomInput,
    Button,
    Input,
    Form,
    FormGroup
} from "reactstrap";

export default class editEssay extends Component {
    preEssay = {
        Answers:this.props.data.Answers,
        checked:this.props.data.checked,
        essayQuestionContent:this.props.data.essayQuestionContent,
        model:this.props.data.model,
        modelEssayQuestionAnswer:this.props.data.modelEssayQuestionAnswer,
        _id:this.props.data._id
    }
    state ={
        essay:this.props.data
    }

    onChange = object => {
        this.setState(Object.assign(this.state.essay, object));
      };

    onSubmit = event => {
        event.preventDefault()

    }


    render() {
        console.log(this.props.data)
        console.log(this.preEssay)
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
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
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
                            </FormGroup>
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
                            <br/>
                            {" "}<Button
                                outline
                                className="float-right"
                                type="submit"
                                color="success"
                                style={{ marginRight: 5, borderRadius: 50 }}
                                onClick={this.props.onEdit}
                            ><i className="fas fa-check"></i>
                            </Button>
                            <Button
                                outline
                                className="float-right"
                                color="danger"
                                style={{ marginRight: 5, borderRadius: 50 }}
                                onClick={()=>{this.props.onEdit();this.onChange(this.preEssay)}}
                            ><i className="fas fa-times"></i>
                            </Button>
                        </Form>

                    </CardBody>
                </Card>
            </div>
        )
    }
}
