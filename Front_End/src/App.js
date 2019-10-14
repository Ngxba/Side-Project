import React from "react";
import NavBar from "./Components/NavBar";
import Carousel from "./Components/Carousel";
import "./Style/App.css";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";
import AddQuestion from "./Components/AddQuestion";
import GetQuestion from "./Components/GetQuestion";
import MakeTest from "./Components/MakeTest";
import TakeExam from "./Components/TakeExam";
import { Row, Container } from "reactstrap";
import CreateClass from "./Components/CreateClass";
import GetClass from "./Components/GetClass";
import GetAllClass from "./Components/GetAllClass";
import GetAllTest from "./Components/GetAllTest";
import MarkExam from "./Components/MarkExam"
// import LandingPage from "./Components/TESTING/paper-kit-react-master/src/views/examples/LandingPage.js";
// import ProfilePage from "./Components/TESTING/paper-kit-react-master/src/views/examples/ProfilePage.js";
import ProfilePage from "./Components/ProfilePage";
class App extends React.Component {
  state = {
    authenUser: {
      isAuthen: true,
      userName: "tung lam",
      userEmail: "tunglam.ngxba@gmail.com",
      roll: "Teacher",
      address: "",
      officeAddress: "",
      city: "",
      state: "",
      zip: "",
      userID: ""
    }
  };
  onRegister = async register_data => {
    return await axios.post("http://localhost:5000/auth/register", {
      email: register_data.email,
      password: register_data.password,
      name: register_data.name,
      address1: register_data.address1,
      address2: register_data.address2,
      city: register_data.city,
      state: register_data.state,
      zip: register_data.zip,
      agree: register_data.agree,
      roll: register_data.roll
    });
  };

  onLogOut = () => {
    this.setState({
      authenUser: {
        isAuthen: null,
        userName: "",
        userEmail: "",
        roll: "",
        address: "",
        officeAddress: "",
        city: "",
        state: "",
        zip: "",
        userID: ""
      }
    });
  };

  onLogin = async login_data => {
    const response = await axios.post("http://localhost:5000/auth/login", {
      email: login_data.loginEmail,
      password: login_data.loginPassword
    });

    if (response.status === 200) {
      this.setState({
        authenUser: {
          isAuthen: true,
          userName: response.data.user.name,
          userEmail: response.data.user.email,
          address: response.data.user.address1,
          officeAddress: response.data.user.address2,
          city: response.data.user.city,
          state: response.data.user.state,
          zip: response.data.user.zip,
          userID: response.data.user._id,
          roll: response.data.user.roll
        }
      });
      localStorage.setItem("jwt_token", response.data.token);
    }
    return response;
  };
  addQuest = () => {
    this.props.history.push("/addquestion");
  };
  makeTest = () => {
    this.props.history.push("/maketest");
  };
  home = () => {
    this.props.history.push("/");
  };
  getQuest = () => {
    this.props.history.push(`/getallquestion`);
  };
  takeTest = () => {
    this.props.history.push(`/taketest`);
  };
  createClass = () => {
    this.props.history.push(`/createclass`);
  };
  getClass = classCode => {
    this.props.history.push(`/class/get?q=${classCode}`);
  };
  seeOwnedClass = () => {
    this.props.history.push(
      `/class/getallclasses?q=${this.state.authenUser.roll}&&d=${this.state.authenUser.userEmail}`
    );
  };
  TESTUI = () => {
    this.props.history.push(`/TESTUI`);
  };
  getProfilePage = () => {
    this.props.history.push(`/profile`);
  };

  async componentDidMount() {
    const token = localStorage.getItem("jwt_token")
    const currentUser = await this.getCurrentUser(token);
    console.log(currentUser)
  }

  getCurrentUser= async (token) => {
    const currentUser = await axios.get("http://localhost:5000/auth/me", {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    return currentUser
  }
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <NavBar
          submitRegister={this.onRegister}
          submitLogin={this.onLogin}
          isAuthen={this.state.authenUser.isAuthen}
          userInfo={this.state.authenUser}
          logOut={this.onLogOut}
          addQuest={this.addQuest}
          home={this.home}
          getQuest={this.getQuest}
          makeTest={this.makeTest}
          takeTest={this.takeTest}
          createClass={this.createClass}
          seeOwnedClass={this.seeOwnedClass}
          getProfilePage={this.getProfilePage}
        ></NavBar>
        <div className="flex-grow-1">
        <Route exact path="/" render={() => <Carousel></Carousel>} />
        <Route path="/class/get" render={() => <GetClass></GetClass>} />
        <Route
          path="/profile"
          render={() => (
            <ProfilePage
              authenUser={this.state.authenUser}
              seeOwnedClass={this.seeOwnedClass}
            ></ProfilePage>
          )}
        />
        <Route
          path="/class/getallclasses"
          render={() => <GetAllClass getClass={this.getClass}></GetAllClass>}
        />
        <Route
          path="/class/maketest"
          render={() => {
            return <MakeTest authedUser={this.state.authenUser}></MakeTest>;
          }}
        />
        <Route
          exact
          path="/class/getalltest"
          render={() => <GetAllTest></GetAllTest>}
        />
        <Route
          exact
          path="/class/getallquestion"
          render={() => <GetQuestion></GetQuestion>}
        />
        {this.state.authenUser.isAuthen && (
          <>
            <Route
              path="/createclass"
              render={() => (
                <CreateClass
                  authedUser={this.state.authenUser}
                  getClass={this.getClass}
                ></CreateClass>
              )}
            />
            <Route
              path="/addquestion"
              render={() => <AddQuestion></AddQuestion>}
            />
            <Route
              path="/class/addquestion"
              render={() => <AddQuestion></AddQuestion>}
            />
            <Route
              path="/maketest"
              render={() => {
                console.log("aaa");
                return <MakeTest authedUser={this.state.authenUser}></MakeTest>;
              }}
            />
            <Route
              exact
              path="/getallquestion"
              render={() => <GetQuestion></GetQuestion>}
            />
            <Route exact path="/class/taketest" render={() => <TakeExam authedUser={this.state.authenUser}></TakeExam>} />
            <Route exact path="/class/marktest" render={() => <MarkExam authedUser={this.state.authenUser}></MarkExam>} />

          </>
        )}
        <>
          <Route exact path="/taketest" render={() => <TakeExam></TakeExam>} />
        </>
        <br />
        </div>
        <footer className="footer footer-black footer-white" style={{backgroundColor : "transparent"}}>
          <Container>
            <Row>
              <nav className="footer-nav">
                <ul>
                  <li>
                    <a href="#love">Created by love</a>
                  </li>
                  <li>
                    <a href="#blog">Blog</a>
                  </li>
                  <li>
                    <a href="#licenses">Licenses</a>
                  </li>
                </ul>
              </nav>
              <div className="credits ml-auto">
                <span className="copyright">
                  © {new Date().getFullYear()}, made with{" "}
                  <i className="fa fa-heart heart" /> by Lam and Thanh
                </span>
              </div>
            </Row>
          </Container>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);
