import React, { Component } from 'react'
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    FormGroup,
    Input,
    Label,
    Button,
    Form
  } from "reactstrap";

export default class Essay extends Component {
    state = {
        model : "essay",
        numberOfQuest: 1,
        essayQuestionContent: "",
        modelEssayQuestionAnswer: ""
      };
    onChange = object => {
        this.setState(Object.assign(this.state, object));
      };
    
      submit = event => {
        event.preventDefault();
        this.props.submitEssayQuestion(this.state);
        this.setState({
          numberOfQuest: this.state.numberOfQuest + 1,
          model : "essay",
          essayQuestionContent: "",
          modelEssayQuestionAnswer: ""
        });
      };
    render() {
        return (
            <div>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h5>Câu hỏi tự luận số {this.state.numberOfQuest}</h5>{" "}
                    </CardTitle>
                    <hr />
                    <CardSubtitle>
                      <h6>
                        <em>Vui lòng nhập câu hỏi</em>
                      </h6>
                    </CardSubtitle>
                    <Form onSubmit= {this.submit}>
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="text"
                        id="question"
                        rows="3"
                        value={this.state.essayQuestionContent}
                        onChange={event => {
                          this.onChange({
                            essayQuestionContent: event.target.value
                          });
                        }}
                      />
                    </FormGroup>
                    <hr />
                    <CardText>
                      <strong>Câu trả lời</strong>
                    </CardText>
                    <FormGroup>
                      <Label for="questioAnswerA">Câu trả lời mẫu:</Label>
                      <Input
                        type="textarea"
                        name="text"
                        id="question"
                        rows="5"
                        value={this.state.modelEssayQuestionAnswer}
                        onChange={event => {
                          this.onChange({
                            modelEssayQuestionAnswer: event.target.value
                          });
                        }}
                      />
                      <br/>
                      <Button type="submit" className="float-right">Submit</Button>
                    </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
            </div>
        )
    }
}
