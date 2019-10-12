import React, { Component } from "react";
import ModalTakeTest from "../ModalTakeTest";
import { getClass, getTest } from "../../Action/class";
import ExamItem from "./examitem";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText
} from "reactstrap";
import queryString from "query-string"
import { withRouter } from "react-router-dom"
import { getListQuest } from "../../Action/getQuest"

class TakeExam extends Component {
  state = {
    modalTakeTest: false,
    testStatus: "not",
    listOfQuizQuest: [],
    listOfEssayQuest: [],
    classCode: "",
    listOfStudent: [],
    displayQuest: {
      num: 0,
      model: "quiz"
    }
  };
  onNextQuest = () => {
    if (this.state.displayQuest.num + 1 === this.state.listOfQuizQuest.length) {
      this.onDisplayQuestChange({
        num: 0,
        model: "essay"
      })
    } else {
      this.onDisplayQuestChange({ num: this.state.displayQuest.num + 1 })
    }
  }
  onPreQuest = () => {
    if (this.state.displayQuest.num === 0 && this.state.displayQuest.model === "essay") {
      this.onDisplayQuestChange({
        num: this.state.listOfQuizQuest.length - 1,
        model: "quiz"
      })
    } else {
      this.onDisplayQuestChange({ num: this.state.displayQuest.num - 1 })
    }
  }
  onDisplayQuestChange = object => {
    this.setState(Object.assign(this.state.displayQuest, object))
  }
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
  fetchTestQuest = async () => {
    const testID = queryString.parse(this.props.location.search).q
    const classID = queryString.parse(this.props.location.search).c
    let res = await getTest(classID)
    res = res.filter(item => item._id === testID)
    const listQuest = await getListQuest(res[0].listOfQuizQuest, res[0].listOfEssayQuest)
    listQuest[0].map(item => item.chosenAnswer = "")
    listQuest[1].map(item => item.chosenAnswer = "")
    this.setState({
      listOfQuizQuest: listQuest[0],
      listOfEssayQuest: listQuest[1],
      classCode: classID
    })
    // console.log(res)
    // console.log(classID)
  }
  componentDidMount() {
    this.setModalTakeTest();
    this.fetchTestQuest()
  }
  render() {
    console.log(this.state.listOfQuizQuest[this.state.displayQuest.num])
    return (
      <div className="d-flex justify-content-center">
        {/* <ModalTakeTest
          takeTest={this.takeTest}
          testStatus={this.state.testStatus}
          visible={this.state.modalTakeTest}
          onToggle={this.setModalTakeTest}
        ></ModalTakeTest> */}
        {this.state.listOfEssayQuest.length === 0 &&
          this.state.listOfQuizQuest.length === 0 && (
            <Container>There are no quest avalaible</Container>
          )}
        <Container className="row mt-5">
          <Card className="col-7 mr-3">
            {this.state.listOfQuizQuest.map((post, index) => {
              if (this.state.displayQuest.model === "quiz" && this.state.displayQuest.num === index)
                return (
                  <ExamItem
                    key={index}
                    data={post}
                    numberOfQuizQuest={index + 1}
                  ></ExamItem>
                );
            })}
            {this.state.listOfEssayQuest.map((post, index) => {
              if (this.state.displayQuest.model === "essay" && this.state.displayQuest.num === index)
                return (
                  <ExamItem
                    key={index}
                    data={post}
                    numberOfEssayQuest={index + 1}
                  ></ExamItem>
                );
            })}
            <hr />
            <CardFooter className="d-flex justify-content-between">
              <Button
                onClick={this.onPreQuest}
                disabled={
                  this.state.displayQuest.model === "quiz" &&
                  this.state.displayQuest.num === 0
                }
              >Previous</Button>
              <Button>Submit</Button>
              <Button
                onClick={this.onNextQuest}
                disabled={
                  this.state.displayQuest.model === "essay" &&
                  this.state.displayQuest.num + 1 === this.state.listOfEssayQuest.length
                }
              >Next</Button>
            </CardFooter>
          </Card>
          <Card className="col-4">
            <CardBody>
              <h5>Các câu hỏi</h5>
              <hr />
              <CardText>Câu hỏi trắc nghiệm: </CardText>
              {this.state.listOfQuizQuest.map((item, index) => {
                return (
                  <Button
                    className="mr-1 mb-1"
                    color={item.chosenAnswer !== "" ? "primary" : ""}
                    key={index}
                    onClick={() => this.onDisplayQuestChange({
                      num: index,
                      model: "quiz"
                    })}
                  >{index + 1}</Button>
                )
              })}
              <CardText>Câu hỏi tự luận</CardText>
              {this.state.listOfEssayQuest.map((item, index) => {
                return (
                  <Button
                    className="mr-1 mb-1"
                    color={item.chosenAnswer !== "" ? "primary" : ""}
                    key={index}
                    onClick={() => this.onDisplayQuestChange({
                      num: index,
                      model: "essay"
                    })}
                  >{index + 1}</Button>
                )
              })}
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withRouter(TakeExam)