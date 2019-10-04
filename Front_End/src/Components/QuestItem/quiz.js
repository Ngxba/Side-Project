import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CustomInput,
  Button
} from "reactstrap";
export default class Quiz extends Component {

  render() {
    return (
      <div><Card><CardBody><CardTitle><h5 style={{ display: "inline-block" }}>
        Câu hỏi trắc nghiệm số {this.props.numberOfQuest}</h5>
        {" "}<Button
          outline
          className="float-right"
          color="danger"
          style={{ marginRight: 5, borderRadius: 50 }}
        ><i className="fas fa-trash"></i>
        </Button>
        <Button
          outline
          className="float-right"
          color="primary"
          style={{ marginRight: 5, borderRadius: 50 }}
          onClick={this.props.onEdit}
        ><i className="fas fa-pen"></i>
        </Button>
        {(this.props.selected === true ||
          this.props.selected === false) && (
            <CustomInput
              type="checkbox"
              className="float-right"
              id={this.props.data._id}
              checked={this.props.selected}
              onChange={() =>
                this.props.onSelect(this.props.data._id, "quiz")
              }
              inline
            />
          )}
      </CardTitle>
        <hr />
        <CardSubtitle>
          <h6>
            <em>Em hãy trả lời câu hỏi sau và chọn một đáp án đúng</em>
          </h6>
          <p>{this.props.data.QuizQuestionContent}</p>
        </CardSubtitle>
        <hr />
        <CardText>Các đáp án: </CardText>
        {this.props.data.Answers.map(answer => {
          return (
            <div key={answer.order}>
              <input type="radio" name={answer + this.props.data._id} />
              {" "}{answer.value}
            </div>
          );
        })}
        <br />
        <CardText>
          Câu trả lời đúng : {this.props.data.rightAnswer}
        </CardText>
      </CardBody>
      </Card>
      </div>
    );
  }
}
