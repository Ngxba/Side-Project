import React, { Component } from "react";
import QuestItem from "../QuestItem";
import { getQuiz } from "../../Action/getQuest";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Col,
    Spinner,
    Container
  } from "reactstrap";
  import classnames from "classnames";
export default class GetQuestion extends Component {
  state = {
    listQuest: [],
    loading: false,
    numberOfQuizQuest: [],
    numberOfEssayQuest: [],
    activeTab: "1"
  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  fetchNewsFeed = async () => {
    this.toggleLoading();
    setTimeout(async () => {
      try {
        const response = await getQuiz();
        this.setState({
          listQuest: response
        });
      } catch (err) {
        console.log(err.message);
      }
      var numberOfQuizQuest =  this.state.listQuest.filter(function(quest) {
        return quest.model === "quiz";}
    );
    var numberOfEssayQuest =  this.state.listQuest.filter(function(quest) {
        return quest.model === "essay";
    })
        this.setState({
            numberOfQuizQuest : numberOfQuizQuest,
            numberOfEssayQuest : numberOfEssayQuest
        })
      this.toggleLoading();
    }, 3000);
  };
  
  componentDidMount() {
    this.fetchNewsFeed();
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
            
          <Container>
          <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Câu hỏi trắc nghiệm
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Câu hỏi tự luận
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              {this.state.numberOfQuizQuest.map((post, index) => {
              return (
                <QuestItem
                  key={post._id}
                  data={post}
                  numberOfQuizQuest={index + 1}
                ></QuestItem>
              );
            })}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              {this.state.numberOfEssayQuest.map((post, index) => {
              return (
                <QuestItem
                  key={post._id}
                  data={post}
                  numberOfEssayQuest={index + 1}
                ></QuestItem>
              );
            })}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
            
            
          </Container>
        )}
      </div>
    );
  }
}
