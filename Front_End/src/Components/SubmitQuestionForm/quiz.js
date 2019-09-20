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
  Label
} from "reactstrap";

export default class Quiz extends Component {
  state = {
    model: "quiz",
    numberOfQuest: 1,
    QuizQuestionContent: "",
    Answers: [{ order: 0, value: "" }]
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
              {this.state.Answers.map(v => (
                <Anwser
                  order={v.order + 1}
                  key={v.order}
                  value={v.value}
                  onChangeValue={this.onChangeAnwser}
                />
              ))}
              <button onClick={this.addAnwser}>Add</button>
              <br />
              <Button type="submit" className="float-right">
                Submit
              </Button>
            </FormGroup>
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
