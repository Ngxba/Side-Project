import React from "react";
import NavBar from "./Components/NavBar";
import Carousel from "./Components/Carousel";
import "./Style/App.css";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";
import AddQuestion from "./Components/AddQuestion";
import GetQuestion from "./Components/GetQuestion";

class App extends React.Component {
  state = {
    authenUser: {
      isAuthen: null,
      userName: "",
      userEmail: ""
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
  makeTest = () => {
    this.props.history.push("/addquestion");
  };

  home = () => {
    this.props.history.push("/");
  };
  getQuest = () => {
    this.props.history.push("/getallquestion");
  };
  render() {
    return (
      <div>
        <NavBar
          submitRegister={this.onRegister}
          submitLogin={this.onLogin}
          isAuthen={this.state.authenUser.isAuthen}
          userInfo={this.state.authenUser}
          logOut={this.onLogOut}
          makeTest={this.makeTest}
          home={this.home}
          getQuest={this.getQuest}
        ></NavBar>
        <br />
        <Route exact path="/" render={() => <Carousel></Carousel>} />
        {/* {
          this.state.authenUser.isAuthen && 
          <>
            <Route
              path="/addquestion"
              render={() => <AddQuestion></AddQuestion>}
            />
            
            <Route
              exact
              path="/getallquestion"
              render={() => <GetQuestion></GetQuestion>}
            />
          </>
        } */}
        <>
            <Route
              path="/addquestion"
              render={() => <AddQuestion></AddQuestion>}
            />
            
            <Route
              exact
              path="/getallquestion"
              render={() => <GetQuestion></GetQuestion>}
            />
          </>
        <br />
      </div>
    );
  }
}

export default withRouter(App);
