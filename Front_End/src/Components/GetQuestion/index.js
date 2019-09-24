import React, { Component } from "react";
import QuestItem from "../QuestItem";
import { getQuiz } from "../../Action/getQuest";
import { delQuest } from "../../Action/delQuest"
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Col,
    Spinner,
    Container,
    CustomInput, 
    Button
  } from "reactstrap";
  import classnames from "classnames";
export default class GetQuestion extends Component {
  state = {
    listQuest: [],
    loading: false,
    numberOfQuizQuest: [],
    numberOfEssayQuest: [],
    activeTab: "1",
    selectedQuest: [],
    selectedAll: false,

  };
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  fetchNewsFeed = async (time) => {
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
        quest.checked = false;
        return quest.model === "quiz";}
    );
    var numberOfEssayQuest =  this.state.listQuest.filter(function(quest) {
        quest.checked = false;
        return quest.model === "essay";
    })
        this.setState({
            numberOfQuizQuest : numberOfQuizQuest,
            numberOfEssayQuest : numberOfEssayQuest
        })
      this.toggleLoading();
    }, time);
  };
  
  componentDidMount() {
    this.fetchNewsFeed(1000);
  }

  toggle = tab => {
    let selectQuizList = []
    this.state.numberOfQuizQuest.map(item => {
      item.checked = false
      return selectQuizList = [...selectQuizList,item]
    })
    let selectEssayList =[]
    this.state.numberOfEssayQuest.map(item => {
      item.checked = false
      return selectEssayList = [...selectEssayList,item]
    })
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        selectedAll: false,
        numberOfEssayQuest:selectEssayList,
        numberOfQuizQuest:selectQuizList
      });
    }
  };


  onSelectAll = async (questType) => {
    this.setState({
      selectedAll: await !this.state.selectedAll
    })
    let selectList = []
    if (questType === "quiz") {
      this.state.numberOfQuizQuest.map(item => {
        item.checked = this.state.selectedAll
        return selectList = [...selectList,item]
      })
    } else {
      this.state.numberOfEssayQuest.map(item => {
        item.checked = this.state.selectedAll
        return selectList = [...selectList,item]
      })
    }
    if (questType==="quiz") this.setState({numberOfQuizQuest: selectList})
    else this.setState({numberOfEssayQuest: selectList})
  }

  onSelectOne = (questID, questType) => {
    let selectList = []
    if (questType === "quiz") {
      this.state.numberOfQuizQuest.map(item => {
        if (item._id === questID) item.checked = !item.checked
        return selectList = [...selectList,item]
      })
    } else {
      this.state.numberOfEssayQuest.map(item => {
        if (item._id === questID) item.checked = !item.checked
        return selectList = [...selectList,item]
      })
    }
    
    if (questType==="quiz") this.setState({numberOfQuizQuest: selectList})
    else this.setState({numberOfEssayQuest: selectList})
  }

  onDeleteQuest = async () => {
    let questIDs = []
    this.state.numberOfQuizQuest.map(item=> {
      if (item.checked) return questIDs = [...questIDs, item._id]
      else return null
    })
    this.state.numberOfEssayQuest.map(item=> {
      if (item.checked) return questIDs = [...questIDs, item._id]
      else return null
    })
    try {
      await delQuest(questIDs)
      this.setState({
        selectedAll: false
      })
    } catch (err) {
      console.log(err.message)
    }
    this.fetchNewsFeed(500)
  }



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
        <div>
        <Button color="danger" className="d-flex justify-content-end" style={{ textAlign: "end" }} onClick={this.onDeleteQuest} >XÓA</Button>{' '}      
        </div>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <CustomInput type="checkbox" className="d-flex justify-content-end" id="chooseAllQuiz" label="Chọn tất cả" checked={this.state.selectedAll} onChange={()=>this.onSelectAll("quiz")} inline/>
            <Row>
              <Col sm="12">
              {this.state.numberOfQuizQuest.map((post, index) => {
              return (
                <QuestItem
                  key={post._id}
                  data={post}
                  numberOfQuizQuest={index + 1}
                  onSelect={this.onSelectOne}
                  selected={post.checked}
                ></QuestItem>
              );
            })}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <CustomInput type="checkbox" className="d-flex justify-content-end" id="chooseAllEssay" label="Chọn tất cả" checked={this.state.selectedAll} onChange={()=>this.onSelectAll("essay")} inline/>
            <Row>
              <Col sm="12">
              {this.state.numberOfEssayQuest.map((post, index) => {
              return (
                <QuestItem
                  key={post._id}
                  data={post}
                  numberOfEssayQuest={index + 1}
                  onSelect={this.onSelectOne}
                  selected={post.checked}
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
