import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  CustomInput,
  Button
} from "reactstrap";

export default class Essay extends Component {
  render() {
    return (
      <div><Card>
          <CardBody>
            <CardTitle>
              <h5 style={{ display: "inline-block" }}>
                Câu hỏi số {this.props.numberOfQuest}
              </h5>
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
                this.props.selected === false) && (<CustomInput
                  type="checkbox"
                  className="float-right"
                  id={this.props.data._id}
                  checked={this.props.selected}
                  onChange={() =>
                    this.props.onSelect(this.props.data._id, "essay")
                  }
                  inline
                />
              )}</CardTitle>
            <hr />
            <CardSubtitle>
              <h6><em>Em hãy đọc câu hỏi sau đây và trả lời :</em>
              </h6>
              <p>{this.props.data.essayQuestionContent}</p>
            </CardSubtitle>
            <hr /><CardText>Câu trả lời mẫu : </CardText>
            <CardText>{this.props.data.modelEssayQuestionAnswer}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
