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
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getUser } from "../../Action/user";

class ProfilePage extends React.Component {
  state = {
    userName: "",
    userEmail: "",
    roll: "",
    address: "",
    officeAddress: "",
    city: "",
    state: "",
    zip: "",
    userID: "",
    activeTab: "1",
    IAmUser : ""
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  fetchData = async () => {
    const user = queryString.parse(this.props.location.search).q;
    const roll = queryString.parse(this.props.location.search).d
    if (!user || !roll) {
      this.setState({
        userName: this.props.authenUser.userName,
        userEmail: this.props.authenUser.userEmail,
        roll: this.props.authenUser.roll,
        address: this.props.authenUser.address,
        officeAddress: this.props.authenUser.officeAddress,
        city: this.props.authenUser.city,
        state: this.props.authenUser.state,
        zip: this.props.authenUser.zip,
        userID: this.props.authenUser.userID,
        IAmUser : true
      });
    } else {
      const response = await getUser(user, roll);
      if(response){
        this.setState({
          userName: response.name,
          userEmail: response.email,
          roll: response.roll,
          address: response.address1,
          officeAddress: response.address2,
          city: response.city,
          state: response.state,
          zip: response.zip,
          userID: response._id,
          IAmUser : false,
        });
      }
      
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
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
                  {this.state.userName}
                  <br />
                </h4>
                <h6 className="description">{this.state.roll}</h6>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>{this.state.userEmail}</p>
                <br />
                {this.state.IAmUser && <Button
                  className="btn-round"
                  color="default"
                  onClick={this.props.seeOwnedClass}
                  outline
                >
                  <i className="fas fa-chalkboard-teacher fa-2x"></i> My Class
                </Button>}
              </Col>
            </Row>
            <br />
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <Nav role="tablist" tabs>
                  <NavItem>
                    <NavLink
                      className={this.state.activeTab === "1" ? "active" : ""}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      Info
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={this.state.activeTab === "2" ? "active" : ""}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      Notification
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
            {/* Tab panes */}
            <TabContent className="following" activeTab={this.state.activeTab}>
              <TabPane tabId="1" id="follows">
                <Container>
                  <Row style={{ margin: "0% 20%" }}>
                    <Col lg="2" md="2" sm="2">
                      <h5>Address:</h5>
                      <h5>Office:</h5>
                      <h5>City:</h5>
                      <h5>Quan:</h5>
                      <h5>Zipcode:</h5>
                      <h5>user ID:</h5>
                    </Col>
                    <Col lg="4" md="4" sm="4">
                      <h5>{this.state.address}</h5>
                      <h5>{this.state.officeAddress}</h5>
                      <h5>{this.state.city}</h5>
                      <h5>{this.state.state}</h5>
                      <h5>{this.state.zip}</h5>
                      <h5>{this.state.userID}</h5>
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
}

export default withRouter(ProfilePage);
