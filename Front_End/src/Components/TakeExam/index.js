import React, { Component } from "react";
import ModalTakeTest from "../ModalTakeTest";
import { getClass } from "../../Action/class";

export default class TakeExam extends Component {
  state = {
    modalTakeTest: false,
    testStatus: "not",
    // testData 
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
          testStatus: true
        });
        console.log(response)
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

      </div>
    );
  }
}
