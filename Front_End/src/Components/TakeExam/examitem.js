import React, { Component } from "react";
import { CardBody, CardSubtitle, CardTitle, CardText, Input } from "reactstrap"

class ExamItem extends Component {
  state = {
    quest: this.props.data
  }

  onChange = object => {
    this.setState(Object.assign(this.state.quest, object))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.props.data.model === "quiz" && (
          <Quiz
            data={this.props.data}
            numberOfQuest={this.props.numberOfQuizQuest}
            onChange={this.onChange}
          ></Quiz>
        )}
        {this.props.data.model === "essay" && (
          <Essay
            data={this.props.data}
            numberOfQuest={this.props.numberOfEssayQuest}
            onChange={this.onChange}
          ></Essay>
        )}
      </div>
    );
  }
}



function Quiz(props) {
  const { numberOfQuest, data, onChange } = props;
  return (
    <div>
      <CardBody>
        <CardTitle>
          <h5 style={{ display: "inline-block" }}>
            Câu hỏi trắc nghiệm số {numberOfQuest}
          </h5>
          {" "}
        </CardTitle>
        <hr />
        <CardSubtitle>
          <h6>
            <em>Em hãy trả lời câu hỏi sau và chọn một đáp án đúng</em>
          </h6>
          <p>{data.QuizQuestionContent}</p>
        </CardSubtitle>
        <hr />
        <CardText>Các đáp án: </CardText>
        {data.Answers.map(answer => {
          return (
            <div key={answer._id}>
              <input
                type="radio"
                name={data._id}
                onChange={() => onChange({ userAnswer: answer.value })}
                value={answer.value}
                checked={data.userAnswer === answer.value}
              />
              {" "}{answer.value}
            </div>
          );
        })}
      </CardBody>
    </div>
  );
}

function Essay(props) {
  const { numberOfQuest, data, onChange } = props;
  return (
    <div>
      <CardBody>
        <CardTitle>
          <h5 style={{ display: "inline-block" }}>
            Câu hỏi tự luận số {numberOfQuest}
          </h5>
          {" "}
        </CardTitle>
        <hr />
        <CardSubtitle>
          <h6>
            <em>Em hãy đọc câu hỏi sau đây và trả lời :</em>
          </h6>
          <p>{data.essayQuestionContent}</p>
        </CardSubtitle>
        <hr />
        <CardText>Câu trả lời : </CardText>
        <Input
          type="textarea"
          name="text"
          rows="5"
          value={data.userAnswer}
          onChange={e => onChange({ userAnswer: e.target.value })}
        />
      </CardBody>
    </div>
  );
}

export default ExamItem;
