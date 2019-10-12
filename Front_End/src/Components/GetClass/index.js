import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getClass } from "../../Action/class";
import { Col, Row, Container, Button } from "reactstrap";
import "./index.css";
// import ProfilePage from "../ProfilePage";
class GetClass extends Component {
  state = {
    classCode: "",
    listOfStudent: [],
    listOfTeacher: [],
    QuestPool: [],
    getStudent: false,
    getTeacher: false
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
    this.props.history.push(`/class/maketest?q=${this.state.classCode}`);
  };

  addQuestInPool = () => {
    this.props.history.push(`/class/addquestion?q=${this.state.classCode}`);
  };

  getQuestPool = () => {
    this.props.history.push(`/class/getallquestion?q=${this.state.classCode}`);
  };
  getAllUserInClass = (data, roll) => {
    if (roll === "Teacher") {
      this.setState({
        getTeacher: true
      });
    } else if (roll === "Student") {
      this.setState({
        getStudent: true
      });
    }
  };
  setStateToOrigin = () => {
    this.setState({
      getStudent: false,
      getTeacher: false
    });
  };


  getAllTest = () => {
    this.props.history.push(`/class/getalltest?q=${this.state.classCode}`)
  }

  seeUser = (user, roll) => {
    this.props.history.push(`/profile?q=${user}&&d=${roll}`);
  }

  render(){
    return (
      <Container>
        <h2 style={{ textAlign: "center" }}>
          Wellcome to class: "{queryString.parse(this.props.location.search).q}"
        </h2>
        Main Teacher : {this.state.listOfTeacher[0]}
        <hr />
        {!this.state.getStudent && !this.state.getTeacher && (
          <div>
            <Row style={{ textAlign: "center" }}>
              <Col>
                <Button
                  className="Button"
                  onClick={() =>
                    this.getAllUserInClass(this.state.listOfTeacher, "Teacher")
                  }
                >
                  GET ALL TEACHER
                </Button>
              </Col>
              <Col>
                <Button
                  className="Button"
                  onClick={() =>
                    this.getAllUserInClass(this.state.listOfStudent, "Student")
                  }
                >
                  GET STUDENT
                </Button>
              </Col>
            </Row>
            <br />
            <Row style={{ textAlign: "center" }}>
              <Col>
                <Button className="Button" onClick={this.getQuestPool}>
                  GET QUESTPOOL
                </Button>
              </Col>
              <Col>
                <Button className="Button" onClick={this.makeTest}>
                  TAKE TEST / MAKE TEST
                </Button>
              </Col>
            </Row>
            <br/>
            <Row style={{textAlign : "center"}}>
                <Col><Button className= "Button" onClick={this.addQuestInPool}>ADD QUEST IN QUESTPOOL</Button></Col>
                <Col><Button className= "Button" onClick={this.getAllTest}>SEE ALL TEST</Button></Col>
            </Row>
          </div>
        )}
        {this.state.getTeacher && (
          <GetAllUserInClass
            listOfTeacher={this.state.listOfTeacher}
            goBack={this.setStateToOrigin}
            seeUser = {this.seeUser}
          ></GetAllUserInClass>
        )}
        {this.state.getStudent && (
          <GetAllUserInClass
            listOfStudent={this.state.listOfStudent}
            goBack={this.setStateToOrigin}
            seeUser = {this.seeUser}
          ></GetAllUserInClass>
        )}
      </Container>
    );
  }
}


function GetAllUserInClass(props) {
  const { listOfStudent, listOfTeacher, goBack, seeUser } = props;
  return (
    <div>
      <ul>
        {listOfStudent &&
          listOfStudent.map(item => {
            return <li key={item}><span className="Btn" onClick={()=>(seeUser(item, "Student"))}>{item}</span></li>;
          })}
        {listOfTeacher &&
          listOfTeacher.map(item => {
            return <li>{item}</li>;
          })}
        <Button onClick={goBack}>GO BACK</Button>
      </ul>
    </div>
  );
}


export default withRouter(GetClass);
