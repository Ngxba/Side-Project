import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";


export default class Quiz extends Component {
  render() {
    return (
      <div>
      <br/>
        <Card>
          <CardBody>
            <CardTitle>
              <h5>Câu hỏi số {this.props.numberOfQuest}</h5>{" "}
            </CardTitle>
            <hr />
            <CardSubtitle>
              <h6>
                <em>Em hãy trả lời câu hỏi sau và chọn một đáp án đúng</em>
              </h6>
            </CardSubtitle>
            <p>
              {this.props.data.QuizQuestionContent}
            </p>
            <hr />
            <CardText>Các đáp án: </CardText>
            {this.props.data.Answers.map(answer => {
                return <div key = {answer._id}>
                <input type="radio" name={answer + this.props.data._id} />{" "}
                {answer.value}
              </div>})}
              <br/>
              <CardText>Câu trả lời đúng : {this.props.data.rightAnswer} </CardText> 
          </CardBody>
        </Card>
        
      </div>
    );
  }
}