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
  Form,
  Alert,
  Spinner
} from "reactstrap";

import { addQuiz } from "../../Action/addQuestion";

export default class Quiz extends Component {
  state = {
    model: "quiz",
    numberOfQuest: 1,
    QuizQuestionContent: "",
    Answers: [{ order: 0, value: "" }],
    rightAnswer: "",
    loading: false,
    pushStatus: "not",
    allQuizQuestions: []
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

  deleteAnswer = () => {
    this.state.Answers.pop()
    this.setState({
      Answers : this.state.Answers
    })
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
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

  submit = async event => {
    event.preventDefault();
    const { model, QuizQuestionContent, Answers, rightAnswer } = this.state;
    try {
      await addQuiz(model, QuizQuestionContent, Answers, rightAnswer);
      this.setState(prevState => ({
        model: "quiz",
        numberOfQuest: this.state.numberOfQuest + 1,
        QuizQuestionContent: "",
        Answers: [{ order: 0, value: "" }],
        rightAnswer: "",
        pushStatus: true,
        allQuizQuestions: [...prevState.allQuizQuestions, this.state]
      }));
      this.props.sendQuizdata(this.state.allQuizQuestions);
      setTimeout(() => {
        this.setState({
          pushStatus: "not"
        });
      }, 2000);
    } catch (err) {
      this.setState({
        pushStatus: false
      });
      setTimeout(() => {
        this.setState({
          pushStatus: "not"
        });
      }, 2000);
    }
  };

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            {this.state.pushStatus === true && (
              <Alert color="success">Submit Question SUCCESS</Alert>
            )}
            {this.state.pushStatus === false && (
              <Alert color="danger">Submit Question FALSE</Alert>
            )}
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
                  id="quizQuestion"
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
                <br />
                <Button
                  outline
                  color="secondary"
                  style={{marginRight : 5}}
                  className="float-right"
                  type="button"
                  onClick={this.addAnwser}
                >
                  <i className="fas fa-plus"></i>
                </Button>
                <Button
                  outline
                  style={{marginRight : 5}}
                  color="secondary"
                  className="float-right"
                  type="button"
                  onClick={this.deleteAnswer}
                >
                  <i className="fas fa-minus"></i>
                </Button>
                <br />
                <hr />
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
                {this.state.loading && (
                  <div style={{ textAlign: "center" }}>
                    <Spinner style={{ width: "3rem", height: "3rem" }} />
                  </div>
                )}
                <Button
                  disabled={
                    this.state.pushStatus === true ||
                    this.state.pushStatus === false
                  }
                  type="submit"
                  className="float-right"
                >
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
