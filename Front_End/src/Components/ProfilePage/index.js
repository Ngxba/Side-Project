
import React from "react";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";

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
    userID,
  } = props.authenUser;
  const seeOwnedClass = props.seeOwnedClass
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
              <Button className="btn-round" color="default" onClick={seeOwnedClass} outline>
              <i className="fas fa-chalkboard-teacher fa-2x"></i> My Class
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
                    Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Notification
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
                  <h5>Address:</h5>
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
              <h5 className="text-muted">Do not have any notification :(</h5>
              <Button className="btn-round" color="secondary">
                Do somthin
              </Button>
            </TabPane>
          </TabContent>
        </Container>
      </div>
    </>
  );
}

export default ProfilePage;
