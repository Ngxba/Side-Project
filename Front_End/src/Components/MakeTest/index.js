import React, { Component } from "react";
import { getQuiz } from "../../Action/getQuest";
import QuestItem from "../QuestItem"
import ModalAskTeacher from "./modalAskTeacher";

export default class MakeTest extends Component {
  state = {
    listQuest: [],
    ModalAskTeacherVisible : true,
    listOfQuizQuestChoose : [],
    listOfEssayQuestChoose : [],
    listOfQuizQuest : [],
    listOfEssayQuest :[],
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
      var listOfQuizQuest =  this.state.listQuest.filter(function(quest) {
        return quest.model === "quiz";}
    );
    var listOfEssayQuest =  this.state.listQuest.filter(function(quest) {
        return quest.model === "essay";
    })
        this.setState({
          listOfQuizQuest : listOfQuizQuest,
          listOfEssayQuest : listOfEssayQuest
        })
  };

  onToggle = () => {
    this.setState({
      ModalAskTeacherVisible : !this.state.ModalAskTeacherVisible
    })
  }
  onSubmit = (data) => {
    let chooseQuizArr = [];
    let chooseQuizQuestion = []
    while (chooseQuizArr.length < data.numberOfQuizQuest) {
      let random = Math.floor(Math.random() * this.state.listOfQuizQuest.length);
      if (!(chooseQuizArr.indexOf(random) >= 0)) {
        chooseQuizArr.push(random);
      }
    }
    chooseQuizArr.map(index => {
        return chooseQuizQuestion = [...chooseQuizQuestion,this.state.listOfQuizQuest[index]]
    })

    let chooseEssayArr = [];
    let chooseEssayQuestion = []
    while (chooseEssayArr.length < data.numberOfEssayQuest) {
      let random = Math.floor(Math.random() * this.state.listOfEssayQuest.length);
      if (!(chooseEssayArr.indexOf(random) >= 0)) {
        chooseEssayArr.push(random);
      }
    }
    chooseEssayArr.map(index => {
      return chooseEssayQuestion = [...chooseEssayQuestion,this.state.listOfEssayQuest[index]]
    })
    this.setState({
      listOfQuizQuestChoose : chooseQuizQuestion,
      listOfEssayQuestChoose : chooseEssayQuestion
    })
  }

  componentDidMount = () => {
    this.fetchNewsFeed()
  }
  render() {
    let numberOfQuizQuest = 0
    let numberOfEssayQuest = 0
    console.log(this.state.listOfEssayQuestChoose)
    return (
      <div>
      <ModalAskTeacher visible = {this.state.ModalAskTeacherVisible} onToggle={this.onToggle} onSubmit={this.onSubmit} numberOfQuizQuest={this.state.listOfQuizQuest.length} numberOfEssayQuest={this.state.listOfEssayQuest.length} ></ModalAskTeacher>
        {this.state.listOfQuizQuestChoose.map((item,index) =>{
          numberOfQuizQuest +=1
          return <QuestItem key={item._id} data={item} numberOfQuizQuest = {numberOfQuizQuest}   ></QuestItem>})}
        ------------------------------------------------------
        {this.state.listOfEssayQuestChoose.map((item,index) =>{
          numberOfEssayQuest +=1
          return <QuestItem key={item._id} data={item} numberOfEssayQuest = {numberOfEssayQuest}  ></QuestItem>})}
        
      </div>
    );
  }
}
