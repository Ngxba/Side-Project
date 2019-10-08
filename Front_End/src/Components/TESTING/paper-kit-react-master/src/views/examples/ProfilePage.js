/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
// import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js";
// import DemoFooter from "../../components/Footers/DemoFooter.js";

function ProfilePage(props) {
  const {
    userName,
    userEmail,
    roll,
    address,
    officeAddress,
    city,
    state,
    zip,
    userID
  } = props.authenUser;
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <div style={{ height: 100 }}></div>
      <div className="section profile-content">
        <Container>
          
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={
                  "https://www.seekclipart.com/clipng/big/205-2053408_project-updates-and-comments-user-icon-free-clipart.png"
                }
              />
            </div>
            <div className="name">
              <h4 className="title">
                {userName}
                <br />
              </h4>
              <h6 className="description">{roll}</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>{userEmail}</p>
              <br />
              <Button className="btn-round" color="default" outline>
                <i className="fa fa-cog" /> Settings
              </Button>
            </Col>
          </Row>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Follows
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Following
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          {/* Tab panes */}
          <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">
            <Container>
              <Row style={{margin : "0% 20%"}}>
                <Col lg="2" md="2" sm="2">
                  <h5>Dia chi:</h5>
                  <h5>Office:</h5>
                  <h5>City:</h5>
                  <h5>Quan:</h5>
                  <h5>Zipcode:</h5>
                  <h5>user ID:</h5>
                </Col>
                <Col lg="4" md="4" sm="4">
                  <h5>{address}</h5>
                  <h5>{officeAddress}</h5>
                  <h5>{city}</h5>
                  <h5>{state}</h5>
                  <h5>{zip}</h5>
                  <h5>{userID}</h5>
                </Col>
              </Row>
              </Container>
            </TabPane>
            <TabPane className="text-center" tabId="2" id="following">
              <h5 className="text-muted">Not following anyone yet :(</h5>
              <Button className="btn-round" color="warning">
                Find artists
              </Button>
            </TabPane>
          </TabContent>
        </Container>
      </div>
      {/* <DemoFooter /> */}
    </>
  );
}

export default ProfilePage;
