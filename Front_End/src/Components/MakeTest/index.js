import React, { Component } from "react";
import { getRandomQuiz } from "../../Action/getQuest";

export default class MakeTest extends Component {
  state = {
    listQuest: []
  };
  fetchNewsFeed = async () => {
    try {
      const response = await getRandomQuiz(20);
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
  
  render() {
    return (
      <div onClick={this.fetchNewsFeed}>
        consolelonging data
      </div>
    );
  }
}
