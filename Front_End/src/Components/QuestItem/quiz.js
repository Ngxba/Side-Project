import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";


export default class Quiz extends Component {
  render() {
    return (
      <div>
      <br/>
        <Card>
          <CardBody>
            <CardTitle>
              <h5 style={{display:"inline-block"}}>Câu hỏi số {this.props.numberOfQuest}</h5>{" "}
              
              <Button outline className="float-right" color="danger" style={{marginRight : 5, borderRadius : 50}} ><i className="fas fa-trash"></i></Button>
              <Button outline className="float-right" color="primary" style={{marginRight : 5, borderRadius : 50}}><i className="fas fa-pen"></i></Button>
            </CardTitle>
            <hr />
            <CardSubtitle>
              <h6>
                <em>Em hãy trả lời câu hỏi sau và chọn một đáp án đúng</em>
              </h6>
            </CardSubtitle>
            <strong>
              {this.props.data.QuizQuestionContent}
            </strong>
            <hr />
            <CardText>Các đáp án: </CardText>
            {this.props.data.Answers.map(answer => {
                return <div key = {answer._id}>
                <input type="radio" name={answer + this.props.data._id} />{" "}
                {answer.value}
              </div>})}
              <br/>
              <hr/>
              <CardText>Câu trả lời đúng : {this.props.data.rightAnswer} </CardText> 
          </CardBody>
        </Card>
        
      </div>
    );
  }
}
