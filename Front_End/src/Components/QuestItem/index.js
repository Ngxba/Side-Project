import React, { Component } from 'react';
import Essay from './essay';
import Quiz from './quiz';

class QuestItem extends Component {

    render() {
        return (
            <div>
                {this.props.data.model === "quiz" && 
                  <Quiz data = {this.props.data} numberOfQuest={this.props.numberOfQuizQuest}></Quiz>
                }{
                  this.props.data.model === "essay" && 
                  <Essay data= {this.props.data} numberOfQuest={this.props.numberOfEssayQuest} ></Essay>
                }
            </div>
        )
    }
}


export default QuestItem;
