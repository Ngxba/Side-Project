import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getClass } from "../../Action/class";
import {
  Col,
  Row,
  Container,
  Button,
  Input,
  Modal,
  Alert,
  Label
} from "reactstrap";
import "./index.css";
import { getAllUserWithRoll } from "../../Action/user";
import { addUserIntoClass } from "../../Action/class";

// import ProfilePage from "../ProfilePage";
class GetClass extends Component {
  state = {
    classCode: "",
    listOfStudent: [],
    listOfTeacher: [],
    QuestPool: [],
    getStudent: false,
    getTeacher: false,
    modalAddTeacher: false,
    TA: "",
    listOfCorrectTeacher: [],
    submitTA: "not"
  };
  async componentDidMount() {
    this.fetchClassResult();
    const response = await getAllUserWithRoll("Teacher");
    const listOfCorrectTeacher = [];
    response.map(item => listOfCorrectTeacher.push(item.email));
    this.setState({
      listOfCorrectTeacher: listOfCorrectTeacher
    });
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
  onChangeTA = value => {
    this.setState({
      TA: value
    });
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
    this.props.history.push(`/class/getalltest?q=${this.state.classCode}`);
  };

  seeUser = (user, roll) => {
    this.props.history.push(`/profile?q=${user}&&d=${roll}`);
  };
  toggleModalAddTeacher = () => {
    this.setState({
      modalAddTeacher: !this.state.modalAddTeacher
    });
  };

  addTeacher = async () => {
    if (this.state.listOfCorrectTeacher.indexOf(this.state.TA) === -1) {
      this.setState({
        submitTA: false
      });
    } else {
      await addUserIntoClass(this.state.classCode, this.state.TA, "Teacher")
      this.setState({
        submitTA: true,
        listOfTeacher : [... this.state.listOfTeacher, this.state.TA]
      });
      this.toggleModalAddTeacher()

    }
  };

  render() {
    return (
      <Container>
        <h2 style={{ textAlign: "center" }}>
          Wellcome to class: "{queryString.parse(this.props.location.search).q}"
        </h2>
        Main Teacher: <strong>{this.state.listOfTeacher[0]}</strong>
        <br />
        Teaching Asisstant:
        <ul>
          {this.state.listOfTeacher.map((item, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <li key={index}>
                <span
                  className="Btn"
                  onClick={() => this.seeUser(item, "Teacher")}
                >
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
        <hr />
        {!this.state.getStudent && !this.state.getTeacher && (
          <div>
            <Row style={{ textAlign: "center" }}>
              <Col>
                <Button className="Button" onClick={this.toggleModalAddTeacher}>
                  ADD TEACHER
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
            <br />
            <Row style={{ textAlign: "center" }}>
              <Col>
                <Button className="Button" onClick={this.addQuestInPool}>
                  ADD QUEST IN QUESTPOOL
                </Button>
              </Col>
              <Col>
                <Button className="Button" onClick={this.getAllTest}>
                  SEE ALL TEST
                </Button>
              </Col>
            </Row>
          </div>
        )}
        {this.state.getTeacher && (
          <GetAllUserInClass
            listOfTeacher={this.state.listOfTeacher}
            goBack={this.setStateToOrigin}
            seeUser={this.seeUser}
          ></GetAllUserInClass>
        )}
        {this.state.getStudent && (
          <GetAllUserInClass
            listOfStudent={this.state.listOfStudent}
            goBack={this.setStateToOrigin}
            seeUser={this.seeUser}
          ></GetAllUserInClass>
        )}
        <ModalAddTeacher
          isOpen={this.state.modalAddTeacher}
          canADD={this.state.submitTA}
          addTeacher={this.addTeacher}
          onChangeValue={this.onChangeTA}
          TA={this.state.TA}
          onToggle={this.toggleModalAddTeacher}
        ></ModalAddTeacher>
      </Container>
    );
  }
}

function GetAllUserInClass(props) {
  const { listOfStudent, seeUser } = props;
  return (
    <div>
      <ul>
        {listOfStudent &&
          listOfStudent.map(item => {
            return (
              <li key={item}>
                <span className="Btn" onClick={() => seeUser(item, "Student")}>
                  {item}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

function ModalAddTeacher(props) {
  const { isOpen, onToggle, onChangeValue, TA, addTeacher, canADD } = props;
  return (
    <>
      <Modal isOpen={isOpen} toggle={onToggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Add Teaching Assistant
          </h5>
        </div>
        <div className="modal-body">
          {canADD === false && (
            <Label style={{ color: "#dc3545" }} className="float-right">
              USER NOT EXIST
            </Label>
          )}
          {canADD ? (
            <Input
              type="text"
              name="text"
              onChange={e => onChangeValue(e.target.value)}
              value={TA}
              required={true}
            />
          ) : (
            <Input
              type="text"
              name="text"
              onChange={e => onChangeValue(e.target.value)}
              style={{ border: "1px solid #dc3545" }}
              value={TA}
              required={true}
            />
          )}
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              data-dismiss="modal"
              type="button"
              onClick={addTeacher}
            >
              Add
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={onToggle}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default withRouter(GetClass);
