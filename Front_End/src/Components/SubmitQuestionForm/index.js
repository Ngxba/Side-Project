import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";
import Quiz from "./quiz";
import Essay from "./essay";
import classnames from "classnames";
import ModalComplePushQuestion from "../ModalCompletePushQuest";

class SubmitQuestionForm extends React.Component {
  state = {
    activeTab: "1",
    quizData : [],
    essayData : [],

  };
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  submitEssayQuestion = async () => {
    const result = await this.props.submitEssayQuestion
    console.log(result)
    return result
  }
  

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Câu hỏi trắc nghiệm
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Câu hỏi tự luận
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Quiz sendQuizdata={(data)=>{
                  this.setState({
                    quizData : data
                  })
                }}></Quiz>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Essay sendEssayData={(data)=>{
                  this.setState({
                    essayData : data
                  })
                }}></Essay>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        { this.props.ModalComplePushQuestion &&   <ModalComplePushQuestion essayData={this.state.essayData} quizData={this.state.quizData} visible = {this.props.ModalComplePushQuestion} onToggle ={this.props.onToggle}></ModalComplePushQuestion>}
     
      </div>
    );
  }
}

export default SubmitQuestionForm;
