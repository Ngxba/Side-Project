import React, { Component } from 'react';
import Essay from './essay';
import Quiz from './quiz';
import { Container } from "reactstrap";

class QuestItem extends Component {

    componentDidMount (){
    }
    render() {
      console.log(this.props.data)
        return (<Container>
            <div>
                {this.props.data.model === "quiz" && 
                  <Quiz data = {this.props.data} numberOfQuest={this.props.numberOfQuizQuest}></Quiz>
                }{
                  this.props.data.model === "essay" && 
                  <Essay numberOfQuest= {this.props.numberOfEssayQuest}></Essay>
                }
            </div>
            </Container>
        )
    }
}


export default QuestItem;
