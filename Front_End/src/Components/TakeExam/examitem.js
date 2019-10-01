import React, { Component } from "react";
import {Card,CardBody,CardSubtitle,CardTitle,CardText,Input} from "reactstrap"

class ExamItem extends Component {
  render() {
    return (
      <div> 
        {this.props.data.model === "quiz" && (
          <Quiz
            data={this.props.data}
            numberOfQuest={this.props.numberOfQuizQuest}
          ></Quiz>
        )}
        {this.props.data.model === "essay" && (
          <Essay
            data={this.props.data}
            numberOfQuest={this.props.numberOfEssayQuest}
          ></Essay>
        )}
                    
      </div>
    );
  }
}


function Quiz(props) {
  const { numberOfQuest, data } = props;
  return (
    <div><Card><CardBody><CardTitle><h5 style={{ display: "inline-block" }}>
                Câu hỏi trắc nghiệm số {numberOfQuest}</h5>
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
                  <input type="radio" name={answer + data._id} />
                  {" "}{answer.value}
                </div>
              );
            })}</CardBody>
        </Card>
      </div>
  );
}

function Essay(props) {
  const { numberOfQuest, data } = props;
  return (
    <div>
        <Card>
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
                  // value={this.state.modelEssayQuestionAnswer}
                  // onChange={event => {
                  //   this.onChange({
                  //     modelEssayQuestionAnswer: event.target.value
                  //   });
                  // }
                  // }
                />
          </CardBody>
        </Card>
      </div>
  );
}

export default ExamItem;
