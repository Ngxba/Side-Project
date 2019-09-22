import React, { Component } from "react";
import QuestItem from "../QuestItem";
import { getQuiz } from "../../Action/getQuest";
import { Spinner } from "reactstrap";
export default class GetQuestion extends Component {
  state = {
    listQuest: [],
    loading: false,
    numberOfQuizQuest: [],
    numberOfEssayQuest: []
  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  fetchNewsFeed = async () => {
    this.toggleLoading();
    setTimeout(async () => {
      try {
        const response = await getQuiz();
        this.setState({
          listQuest: response
        });
      } catch (err) {
        console.log(err.message);
      }
      var numberOfQuizQuest =  this.state.listQuest.filter(function(quest) {
        return quest.model === "quiz";}
    );
    var numberOfEssayQuest =  this.state.listQuest.filter(function(quest) {
        return quest.model === "essay";
    })
        this.setState({
            numberOfQuizQuest : numberOfQuizQuest,
            numberOfEssayQuest : numberOfEssayQuest
        })
        // console.log(this.state.numberOfEssayQuest, this.state.numberOfQuizQuest)
      this.toggleLoading();
    }, 3000);
  };
  
//   componentDidUpdate(prevProps, prevStates) {
//       if(this.state !== prevStates && this.props !== prevProps){
          
//       }
//   }

  componentDidMount() {
    this.fetchNewsFeed();
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
          <div>
            {this.state.numberOfQuizQuest.map((post, index) => {
              return (
                <QuestItem
                  key={post._id}
                  data={post}
                  numberOfQuizQuest={index + 1}
                ></QuestItem>
              );
            })}
            {this.state.numberOfEssayQuest.map((post, index) => {
              return (
                <QuestItem
                  key={post._id}
                  data={post}
                  numberOfQuizQuest={index + 1}
                ></QuestItem>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
