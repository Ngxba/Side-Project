import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Alert,
//   Spinner
} from "reactstrap";
import QuestItem from "../QuestItem"

class ModalComplePushQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      quizData : [],
      essayData: [],
    };
  }


  setStatetoOrigin = () => {
    this.setState({
    });
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  onLogin = async () => {
    this.toggleLoading();
    setTimeout(async () => {
      await this.props.submit(this.state);
      this.toggleLoading();
      if (this.props.loginStatus === true) {
        this.setStatetoOrigin();
      }
    }, 1000);
  };

  onToggle = () => {
    this.props.onToggle();
    this.setStatetoOrigin();
  };

  componentDidMount() {
    this.setState({
        quizData : this.props.quizData,
        essayData : this.props.essayData
    })
  }
  onClick = () => {
    console.log(this.state.quizData)
    console.log(this.state.essayData)

  }

  render() {
    return (
      <Modal isOpen={this.props.visible} toggle={this.onToggle}>
        <ModalHeader>ALL QUEST JUST INPUT</ModalHeader>
        <ModalBody>
        {this.state.quizData.map((post, index) => {
              return (
                <QuestItem
                  key={post.QuizQuestionContent}
                  data={post}
                  numberOfQuizQuest={index + 1}
                ></QuestItem>
              );
            })}
            <p>Essay</p>
            {this.state.essayData.map((post, index) => {
              return (
                <QuestItem
                  key={post.essayQuestionContent}
                  data={post}
                  numberOfEssayQuest={index + 1}
                ></QuestItem>
              );
            })}   
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={this.state.loading}
            color="primary"
            onClick={this.onClick}
          >
            Accept and Push
          </Button>{" "}
          <Button color="secondary" 
          onClick={this.onToggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalComplePushQuestion;
