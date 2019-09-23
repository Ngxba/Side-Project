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
      quizData : [],
      essayData: [],
    };
  }


  onToggle = () => {
    this.props.onToggle();
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
        {this.state.quizData[0] === undefined && <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam sequi, unde non doloribus adipisci autem corporis voluptate hic? Magnam eveniet reiciendis esse, corrupti et repellendus hic repellat veritatis? Eligendi, sed?</p> }
        {this.state.quizData.map((post, index) => {
              return (
                <QuestItem
                  key={post.QuizQuestionContent}
                  data={post}
                  numberOfQuizQuest={index + 1}
                ></QuestItem>
              );
            })}
            <br/>
            <hr/>
            <br/>
            {this.state.essayData[0] === undefined && <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam sequi, unde non doloribus adipisci autem corporis voluptate hic? Magnam eveniet reiciendis esse, corrupti et repellendus hic repellat veritatis? Eligendi, sed?</p> }
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
            OK
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
