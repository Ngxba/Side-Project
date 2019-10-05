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
import LandingPage from "./Components/TESTING/paper-kit-react-master/src/views/examples/LandingPage.js";
import ProfilePage from "./Components/TESTING/paper-kit-react-master/src/views/examples/ProfilePage.js"

class App extends React.Component {
  state = {
    authenUser: {
      isAuthen: true,
      userName: "Tung Lam Nguyen Ba",
      userEmail: "tunglam.ngxba@gmail.com",
      roll: "teacher"
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
      agree: register_data.agree
    });
  };

  onLogOut = () => {
    this.setState({
      authenUser: {
        isAuthen: null,
        userName: "",
        userEmail: ""
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
          userName: response.data.name,
          userEmail: response.data.email
        }
      });
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
    this.props.history.push("/getallquestion");
  };
  takeTest = () => {
    this.props.history.push(`/taketest`);
  };
  createClass = () => {
    this.props.history.push(`/createclass`);
  };
  getClass = (classCode) => {
    this.props.history.push(`/class/get?q=${classCode}`)
  }
  seeOwnedClass = () => {
    this.props.history.push(`/class/getallclasses?q=${this.state.authenUser.roll}&&d=${this.state.authenUser.userEmail}`)
  }
  TESTUI = () => {
    this.props.history.push(`/TESTUI`)
  }
  render() {
    return (
      <div>
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
          createClass = {this.createClass}
          seeOwnedClass = {this.seeOwnedClass}
          TESTUI = {this.TESTUI}
        ></NavBar>
        <br />
        <Route
              path="/createclass"
              render={() => (
                <CreateClass authedUser={this.state.authenUser} getClass={this.getClass}></CreateClass>
              )}
            />
        <Route exact path="/" render={() => <Carousel></Carousel>} />
        <Route path="/class/get" render={() => <GetClass></GetClass>}/>
        <Route path="/TESTUI" render={() => <ProfilePage></ProfilePage>}/>
        <Route path="/class/getallclasses" render={() => <GetAllClass getClass={this.getClass}></GetAllClass>}/>
        {this.state.authenUser.isAuthen && (
          <>
            <Route
              path="/addquestion"
              render={() => <AddQuestion></AddQuestion>}
            />
            <Route
              path="/maketest"
              render={() => (
                <MakeTest authedUser={this.state.authenUser}></MakeTest>
              )}
            />
            <Route
              exact
              path="/getallquestion"
              render={() => <GetQuestion></GetQuestion>}
            />
          </>
        )}
        <>
          <Route exact path="/taketest" render={() => <TakeExam></TakeExam>} />
        </>
        <br />
        <footer className="footer footer-black footer-white">
          <Container>
            <Row>
              <nav className="footer-nav">
                <ul>
                  <li>
                    <a
                      href="https://www.creative-tim.com?ref=pkr-footer"
                      
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://blog.creative-tim.com/?ref=pkr-footer"
                      
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.creative-tim.com/license?ref=pkr-footer"
                    >
                      Licenses
                    </a>
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
