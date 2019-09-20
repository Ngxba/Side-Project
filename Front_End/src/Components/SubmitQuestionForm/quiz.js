import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button,
  FormGroup,
  Input,
  Label,
  Form
} from "reactstrap";

export default class Quiz extends Component {
  state = {
    model: "quiz",
    numberOfQuest: 1,
    QuizQuestionContent: "",
    Answers: [{ order: 0, value: "" }],
    rightAnswer: ""
  };
  addAnwser = () => {
    this.setState(prev => ({
      Answers: [
        ...prev.Answers,
        {
          order: prev.Answers.length,
          value: ""
        }
      ]
    }));
  };

  onChangeAnwser = (order, value) => {
    this.setState(prev => {
      const answers = [...prev.Answers];
      answers[order - 1].value = value;
      return {
        Answers: answers
      };
    });
  };

  submit = event => {
    event.preventDefault();
    this.props.submitQuiz(this.state);
    this.setState({
      model: "quiz",
      numberOfQuest: this.state.numberOfQuest + 1,
      QuizQuestionContent: "",
      Answers: [{ order: 0, value: "" }],
      rightAnswer: ""
    });
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
              <h5>Câu hỏi trắc nhiệm số {this.state.numberOfQuest}</h5>{" "}
            </CardTitle>
            <hr />
            <CardSubtitle>
              <h6>
                <em>Vui lòng nhập câu hỏi</em>
              </h6>
            </CardSubtitle>
            <Form onSubmit={this.submit}>
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
                <hr />
                <CardText>
                  <strong>Các câu trả lời</strong>
                </CardText>
                {this.state.Answers.map(v => (
                  <Anwser
                    order={v.order + 1}
                    key={v.order}
                    value={v.value}
                    onChangeValue={this.onChangeAnwser}
                  />
                ))}
                  <br/>
                <Button outline color="secondary" className="float-right" type="button" onClick={this.addAnwser}>Add more answer</Button>
                  <br/>
                  <hr/>
                <Label>Câu trả lời đúng:</Label>
                <Input
                  type="textarea"
                  name="text"
                  onChange={event => {
                    this.onChange({
                      rightAnswer: event.target.value
                    });
                  }}
                  value={this.state.rightAnswer}
                />
                <br />

                <Button type="submit" className="float-right">
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function Anwser(props) {
  const { order, onChangeValue, value } = props;
  return (
    <>
      <Label>Câu trả lời {order}:</Label>
      <Input
        type="textarea"
        name="text"
        onChange={e => onChangeValue(order, e.target.value)}
        value={value}
      />
    </>
  );
}
