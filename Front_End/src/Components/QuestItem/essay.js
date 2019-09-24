import React, { Component } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, CardText } from "reactstrap"
import { CustomInput } from 'reactstrap'

export default class Essay extends Component {
  render() {
    return (
      <div>
        <br />
        <Card>
          <CardBody>
            <CardTitle>
              <div className="d-inline-flex">
                <h5>Câu hỏi số {this.props.numberOfQuest}</h5>{" "}
              </div>
              <CustomInput type="checkbox" className="float-right" id={this.props.data._id} checked={this.props.selected} onChange={() => this.props.onSelect(this.props.data._id, "essay")} inline />
            </CardTitle>
            <hr />
            <CardSubtitle>
              <h6>
                <em>Em hãy đọc câu hỏi sau đây và trả lời :</em>
              </h6>
            </CardSubtitle>
            <p>
              {this.props.data.essayQuestionContent}
            </p>
            <hr />
            <CardText>Câu trả lời mẫu : </CardText>
            <CardText>{this.props.data.modelEssayQuestionAnswer} </CardText>
          </CardBody>
        </Card>

      </div>
    )
  }
}
