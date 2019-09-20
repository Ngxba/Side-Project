import React from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

class QuestionForm extends React.Component {
  state = {
    numberOfQuest: 1,
    answerContentA: "this is content for Answer A",
    answerContentB: "this is content for Answer B",
    answerContentC: "this is content for Answer C",
    answerContentD: "this is content for Answer D"
  };
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <h5>Câu hỏi số {this.state.numberOfQuest}</h5>{" "}
            </CardTitle>
            <hr />
            <CardSubtitle>
              <h6>
                <em>Đọc kĩ câu hỏi trước khi điền câu trả lời</em>
              </h6>
            </CardSubtitle>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis libero aut veniam repudiandae deserunt fugit adipisci.
              Totam, numquam. Sed, dolor! Unde expedita architecto ipsam quam
              qui quidem corporis illo explicabo.
            </p>
            <hr />
            <CardText>Trả lời</CardText>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <input type="radio" name="answer" value="A" />{" "}
                {this.state.answerContentA}
              </div>
              <div>
                <input type="radio" name="answer" value="B" />{" "}
                {this.state.answerContentB}
              </div>
              <div>
                <input type="radio" name="answer" value="C" />{" "}
                {this.state.answerContentC}
              </div>
              <div>
                <input type="radio" name="answer" value="D" />{" "}
                {this.state.answerContentD}
              </div>
            </div>
            <br />
            {/* <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink> */}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default QuestionForm;
