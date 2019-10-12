import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Form,
  FormGroup,
  UncontrolledCollapse,
  Input
} from "reactstrap";
import Register from "../ModalRegister";
import Login from "../ModalLogin";
import PesonalBar from "../PesonalBar";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, // bien nay dung de khi thu nho vao thi drop down co hoat dong hay khong
      modalRegister: false,
      modalLogin: false,
      registerSuccessful: "not",
      loginSuccessful: "not",
      personalProfile: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  setModalRegister = () => {
    this.setState({
      modalRegister: !this.state.modalRegister,
      registerSuccessful: "not"
    });
  };

  setModalLogin = () => {
    this.setState({
      modalLogin: !this.state.modalLogin,
      loginSuccessful: "not"
    });
  };
  setPersonalProfile = () => {
    this.setState({
      personalProfile: !this.state.personalProfile
    });
  };

  wantToRegisterOnLogin = () => {
    this.setModalLogin();
    this.setModalRegister();
  };
  onSubmitRegister = async register_data => {
    try {
      const response = await this.props.submitRegister(register_data);
      if (response.status === 200) {
        this.setState({
          registerSuccessful: true
        });
        await setTimeout(() => {
          this.setModalRegister();
        }, 600);
      }
    } catch (err) {
      this.setState({
        registerSuccessful: false
      });
    }
  };

  onSubmitLogin = async login_data => {
    try {
      const response = await this.props.submitLogin(login_data);
      if (response.status === 200) {
        this.setState({
          loginSuccessful: true
        });
        await setTimeout(() => {
          this.setModalLogin();
        }, 600);
      }
      
    } catch (err) {
      this.setState({
        loginSuccessful: false
      });
    }
  };

  onLogOut = () => {
    this.props.logOut();
    this.props.home();
  };

  render() {
    return (
      <div>
      
        <Navbar color="dark" light expand="md">
          <Container>
            <NavbarBrand href="#" onClick={this.props.home}>
              <img
                className="logo"
                src="https://blindspot.vn/wp-content/uploads/2019/05/cropped-Final-Final-LOGO-Blind-SpotDone.png"
                alt="logo"
              />
              <span className="clr-black" onClick={this.props.home}>
                SmartEXAM
              </span>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#" onClick={this.props.takeTest}>
                    Take test
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={this.props.TESTUI}>
                    TESTING UI
                  </NavLink>
                </NavItem>
                {!this.props.isAuthen ? (
                  <>
                    <NavItem>
                      <NavLink href="#" onClick={this.setModalLogin}>
                        Login
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" onClick={this.setModalRegister}>
                        Register
                      </NavLink>
                    </NavItem>
                  </>
                ) : (
                  <>
                    <NavItem>
                      <NavLink href="#" onClick={this.props.makeTest}>
                        Make Test
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" onClick={this.props.getQuest}>
                        See all Quest
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" onClick={this.props.addQuest}>
                        Add Question
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" onClick={this.props.createClass}>
                        CREATE A CLASS
                      </NavLink>
                    </NavItem>
                    <PesonalBar
                      logOut={this.onLogOut}
                      visible={this.state.personalProfile}
                      onToggle={this.setPersonalProfile}
                      userInfo={this.props.userInfo}
                      seeOwnedClass={this.props.seeOwnedClass}
                      seeMyProfile={this.props.getProfilePage}
                    />
                  </>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Login
          visible={this.state.modalLogin}
          onToggle={this.setModalLogin}
          submit={this.onSubmitLogin}
          loginStatus={this.state.loginSuccessful}
          wantToRegister={this.wantToRegisterOnLogin}
        ></Login>
        <Register
          visible={this.state.modalRegister}
          onToggle={this.setModalRegister}
          submit={this.onSubmitRegister}
          registerStatus={this.state.registerSuccessful}
        ></Register>
        {/* <Example></Example> */}
      </div>
    );
  }
}

function Example() {
  const [bodyClick, setBodyClick] = React.useState(false);
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
          }}
        />
      ) : null}
      <Navbar color="primary" expand="lg">
        <Container>
          <button
            className="navbar-toggler"
            id="navbarTogglerDemo01"
            type="button"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setBodyClick(true);
            }}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbarTogglerDemo01">
            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
              Hidden brand
            </NavbarBrand>
            <Nav className="mr-auto mt-2 mt-lg-0" navbar>
              <NavItem className="active">
                <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                  Link
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="disabled"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Disabled
                </NavLink>
              </NavItem>
            </Nav>
            <Form className="form-inline ml-auto">
              <FormGroup className="has-white">
                <Input placeholder="Search" type="text" />
              </FormGroup>
            </Form>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
