import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getClass } from "../../Action/class";
import { Col, Row, Container, Button } from "reactstrap";
import "./index.css";
class GetClass extends Component {
  state = {
    classCode: "",
    listOfStudent: [],
    listOfTeacher: [],
    QuestPool: []
  };
  async componentDidMount() {
    this.fetchClassResult();
  }
  fetchClassResult = async () => {
    {
      const query = queryString.parse(this.props.location.search).q; //class code
      try {
        const response = await getClass(query);
        this.setState({
          classCode: response.classCode,
          listOfTeacher: response.listOfTeacher,
          listOfStudent: response.listOfStudent,
          QuestPool: response.poolQuest
        });
      } catch (err) {
        console.log("get class err");
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchClassResult();
    }
  }

  makeTest = () => {
      this.props.history.push(`/class/maketest?q=${this.state.classCode}`)
  }

  addQuestInPool = () => {
    this.props.history.push(`/class/addquestion?q=${this.state.classCode}`);
  }

  getQuestPool = () => {
    this.props.history.push(`/class/getallquestion?q=${this.state.classCode}`);
  }

  getAllTest = () => {
    this.props.history.push(`/class/getalltest?q=${this.state.classCode}`)
  }

  render() {
    return (
      <Container>
        <h2>
          Wellcome to class "{queryString.parse(this.props.location.search).q}":
        </h2>
        Teacher
        <ul>
          {this.state.listOfTeacher.map(teacher => (
            <li>{teacher}</li>
          ))}
        </ul>
        Student
        <ul>
          {this.state.listOfStudent.map(student => (
            <li>{student}</li>
          ))}
        </ul>
        <hr />
        <div>
            <Row style={{textAlign : "center"}}>
                <Col><Button className= "Button">GET TEACHER</Button></Col>
                <Col><Button className= "Button">GET STUDENT</Button></Col>
            </Row>
            <br/>
            <Row style={{textAlign : "center"}}>
                <Col><Button className= "Button" onClick={this.getQuestPool}>GET QUESTPOOL</Button></Col>
                <Col><Button className= "Button" onClick={this.makeTest}>TAKE TEST / MAKE TEST</Button></Col>
            </Row>
            <br/>
            <Row style={{textAlign : "center"}}>
                <Col><Button className= "Button" onClick={this.addQuestInPool}>ADD QUEST IN QUESTPOOL</Button></Col>
                <Col><Button className= "Button" onClick={this.getAllTest}>SEE ALL TEST</Button></Col>
            </Row>
        </div>
      </Container>
    );
  }
}

export default withRouter(GetClass);
