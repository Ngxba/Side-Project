import React, { Component } from 'react';
import Essay from './essay';
import Quiz from './quiz';

class QuestItem extends Component {

    render() {
      // console.log(this.props.data)
        return (
            <div>
                {this.props.data.model === "quiz" && 
                  <Quiz data = {this.props.data} numberOfQuest={this.props.numberOfQuizQuest} onSelect={this.props.onSelect} selected={this.props.selected} ></Quiz>
                }{
                  this.props.data.model === "essay" && 
                  <Essay data= {this.props.data} numberOfQuest={this.props.numberOfEssayQuest} onSelect={this.props.onSelect} selected={this.props.selected}></Essay>
                }
            </div>
        )
    }
}


export default QuestItem;
