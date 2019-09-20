import React, { Component } from 'react'
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Button, FormGroup, Input, Label} from "reactstrap"

export default class Quiz extends Component {
    state = {
        model : "quiz",
        numberOfQuest: 1,
        QuizQuestionContent: "",
        answerContentA: "",
        answerContentB: "",
        answerContentC: "",
        answerContentD: "",
      };
    onChange = object => {
        this.setState(Object.assign(this.state, object));
      };
    render() {
        return (
            <div>
                  <Card>
                  <CardBody>
                    <CardTitle>
                      <h5>Câu hỏi số {this.state.numberOfQuest}</h5>{" "}
                    </CardTitle>
                    <hr />
                    <CardSubtitle>
                      <h6>
                        <em>Vui lòng nhập câu hỏi</em>
                      </h6>
                    </CardSubtitle>
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="text"
                        id="question"
                        rows="3"
                        value={this.state.QuizQuestionContent}
                        onChange={event => {
                          this.onChange({
                            QuizQuestionContent: event.target.value
                          });
                        }}
                      />
                    </FormGroup>
                    <hr />
                    <CardText>
                      <strong>Các câu trả lời</strong>
                    </CardText>
                    <FormGroup>
                      <Label for="questioAnswerA">Câu trả lời A:</Label>
                      <Input
                        type="textarea"
                        name="text"
                        id="questioAnswerA"
                        value={this.state.answerContentA}
                        onChange={event => {
                          this.onChange({ answerContentA: event.target.value });
                        }}
                      />
                      <Label for="questioAnswerB">Câu trả lời B:</Label>
                      <Input
                        type="textarea"
                        name="text"
                        id="questioAnswerB"
                        value={this.state.answerContentB}
                        onChange={event => {
                          this.onChange({ answerContentB: event.target.value });
                        }}
                      />
                      <Label for="questioAnswerC">Câu trả lời C:</Label>
                      <Input
                        type="textarea"
                        name="text"
                        id="questioAnswerC"
                        value={this.state.answerContentC}
                        onChange={event => {
                          this.onChange({ answerContentC: event.target.value });
                        }}
                      />
                      <Label for="questioAnswerD">Câu trả lời D:</Label>
                      <Input
                        type="textarea"
                        name="text"
                        id="questioAnswerD"
                        value={this.state.answerContentD}
                        onChange={event => {
                          this.onChange({ answerContentD: event.target.value });
                        }}
                      />
                      <br/>
                      <Button type="submit" className="float-right">Submit</Button>
                    </FormGroup>
                  </CardBody>
                </Card>
            </div>
        )
    }
}
