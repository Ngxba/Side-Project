import React, { Component } from "react";
import { getQuiz } from "../../Action/getQuest";
import QuestItem from "../QuestItem";
import ModalAskTeacher from "./modalAskTeacher";
import { Container, Alert, Label, Input, Button } from "reactstrap";
import { createClass } from "../../Action/class";

export default class MakeTest extends Component {
  state = {
    listQuest: [],
    ModalAskTeacherVisible: true,
    listOfQuizQuestChoose: [],
    listOfEssayQuestChoose: [],
    listOfQuizQuest: [],
    listOfEssayQuest: [],
    classCode: "",
    Student: [{ order: 0, value: "" }]
  };

  onChangeStudent = (order, value) => {
    this.setState(prev => {
      const student = [...prev.Student];
      student[order - 1].value = value;
      return {
        Student: student
      };
    });
  };

  fetchNewsFeed = async () => {
    try {
      const response = await getQuiz();
      this.setState({
        listQuest: response
      });
    } catch (err) {
      console.log(err.message);
    }
    var listOfQuizQuest = this.state.listQuest.filter(function(quest) {
      return quest.model === "quiz";
    });
    var listOfEssayQuest = this.state.listQuest.filter(function(quest) {
      return quest.model === "essay";
    });
    this.setState({
      listOfQuizQuest: listOfQuizQuest,
      listOfEssayQuest: listOfEssayQuest
    });
  };

  onToggle = () => {
    this.setState({
      ModalAskTeacherVisible: !this.state.ModalAskTeacherVisible
    });
  };
  onSubmit = async data => {
    let chooseQuizArr = [];
    let chooseQuizQuestion = [];
    while (chooseQuizArr.length < data.numberOfQuizQuest) {
      let random = Math.floor(
        Math.random() * this.state.listOfQuizQuest.length
      );
      if (!(chooseQuizArr.indexOf(random) >= 0)) {
        chooseQuizArr.push(random);
      }
    }
    chooseQuizArr.map(index => {
      return (chooseQuizQuestion = [
        ...chooseQuizQuestion,
        this.state.listOfQuizQuest[index]
      ]);
    });

    let chooseEssayArr = [];
    let chooseEssayQuestion = [];
    while (chooseEssayArr.length < data.numberOfEssayQuest) {
      let random = Math.floor(
        Math.random() * this.state.listOfEssayQuest.length
      );
      if (!(chooseEssayArr.indexOf(random) >= 0)) {
        chooseEssayArr.push(random);
      }
    }
    chooseEssayArr.map(index => {
      return (chooseEssayQuestion = [
        ...chooseEssayQuestion,
        this.state.listOfEssayQuest[index]
      ]);
    });
    this.setState({
      listOfQuizQuestChoose: chooseQuizQuestion,
      listOfEssayQuestChoose: chooseEssayQuestion,
      classCode: data.classCode
    });
    await createClass(
      data.classCode,
      chooseQuizQuestion,
      chooseEssayQuestion,
      this.props.authedUser
    );
  };
  addAnwser = () => {
    this.setState(prev => ({
      Student: [
        ...prev.Student,
        {
          order: prev.Student.length,
          value: ""
        }
      ]
    }));
  };

  deleteAnswer = () => {
    this.state.Student.pop();
    this.setState({
      Student: this.state.Student
    });
  };

  componentDidMount = () => {
    this.fetchNewsFeed();
  };
  render() {
    let numberOfQuizQuest = 0;
    let numberOfEssayQuest = 0;
    return (
      <div>
        <Container>
          {this.state.classCode && (
            <Alert color="success">
              Create quest pool success, your code : "{this.state.classCode}"
            </Alert>
          )}
          <ModalAskTeacher
            visible={this.state.ModalAskTeacherVisible}
            onToggle={this.onToggle}
            onSubmit={this.onSubmit}
            numberOfQuizQuest={this.state.listOfQuizQuest.length}
            numberOfEssayQuest={this.state.listOfEssayQuest.length}
          ></ModalAskTeacher>
          {this.state.Student.map(v => (
            <Student
              order={v.order + 1}
              key={v.order}
              value={v.value}
              onChangeValue={this.onChangeStudent}
            />
          ))}
          <br/>
          <Button
            outline
            color="primary"
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
            color="primary"
            className="float-right"
            type="button"
            onClick={this.deleteAnswer}
          ><i className="fas fa-minus"></i></Button>
          <br/>
          <br/>
          {this.state.listOfQuizQuestChoose.map((item, index) => {
            numberOfQuizQuest += 1;
            return (
              <QuestItem
                key={item._id}
                data={item}
                numberOfQuizQuest={numberOfQuizQuest}
              ></QuestItem>
            );
          })}
          <hr />
          {this.state.listOfEssayQuestChoose.map((item, index) => {
            numberOfEssayQuest += 1;
            return (
              <QuestItem
                key={item._id}
                data={item}
                numberOfEssayQuest={numberOfEssayQuest}
              ></QuestItem>
            );
          })}
        </Container>
      </div>
    );
  }
}

function Student(props) {
  const { order, onChangeValue, value } = props;
  let opacity = 1;
  if (value === "") {
    opacity = 0.5;
  }
  return (
    <>
      <Label style={{ opacity: opacity }}>Học sinh {order}:</Label>
      <Input
        type="textarea"
        name="text"
        onChange={e => onChangeValue(order, e.target.value)}
        value={value}
        style={{ opacity: opacity }}
        required={true}
      />
    </>
  );
}
