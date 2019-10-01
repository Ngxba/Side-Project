import React, { Component } from "react";
import ModalTakeTest from "../ModalTakeTest";
import { getClass } from "../../Action/class";
import ExamItem from "./examitem";
import { Container } from "reactstrap";

export default class TakeExam extends Component {
  state = {
    modalTakeTest: false,
    testStatus: "not",
    listOfQuizQuest: [],
    listOfEssayQuest: [],
    classCode: "",
    listOfStudent: []
  };
  setModalTakeTest = () => {
    this.setState({
      modalTakeTest: !this.state.modalTakeTest,
      testStatus: "not"
    });
  };
  takeTest = async data => {
    try {
      const response = await getClass(data.classCode);
      if (response) {
        this.setState({
          testStatus: true,
          classCode: response.classCode,
          listOfQuizQuest: response.listOfQuizQuest,
          listOfEssayQuest: response.listOfEssayQuest,
          listOfStudent: response.listOfStudent
        });
        await setTimeout(() => {
          this.setModalTakeTest();
        }, 600);
      }
    } catch (err) {
      this.setState({
        testStatus: false
      });
    }
  };
  componentDidMount() {
    this.setModalTakeTest();
  }
  render() {
    return (
      <div>
        <ModalTakeTest
          takeTest={this.takeTest}
          testStatus={this.state.testStatus}
          visible={this.state.modalTakeTest}
          onToggle={this.setModalTakeTest}
        ></ModalTakeTest>
        {this.state.listOfEssayQuest.length === 0 &&
          this.state.listOfQuizQuest.length === 0 && (
            <Container>There are no quest avalaible</Container>
          )}
        <Container>
          {this.state.listOfQuizQuest.map((post, index) => {
            return (
              <ExamItem
                key={post._id}
                data={post}
                numberOfQuizQuest={index + 1}
              ></ExamItem>
            );
          })}
          {this.state.listOfEssayQuest.map((post, index) => {
            return (
              <ExamItem
                key={post._id}
                data={post}
                numberOfEssayQuest={index + 1}
              ></ExamItem>
            );
          })}
        </Container>
      </div>
    );
  }
}
