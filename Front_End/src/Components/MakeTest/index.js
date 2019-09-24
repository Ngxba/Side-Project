import React, { Component } from "react";
import { getQuiz } from "../../Action/getQuest";

export default class MakeTest extends Component {
  state = {
    listQuest: []
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
  };
  componentDidMount() {
    this.fetchNewsFeed();
  }
  onClick = () =>{
    let arr = [1, 2, 3];
    arr.length = 49;

    let chooseArr = [];
    for (var i = 0; i < 20; i++) {
      let random = Math.floor(Math.random() * 20) + 1;
      chooseArr.push(random);
    }
    console.log(chooseArr);
  }
  render() {
    return (
      <div onClick={this.onClick}>
        consolelonging data
      </div>
    );
  }
}
