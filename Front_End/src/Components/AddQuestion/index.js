import React, { Component } from "react";
import { Container, Button, Spinner } from "reactstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import SubmitQuestionForm from "../SubmitQuestionForm";

class AddQuestion extends Component {
  state = {
    loading: false,
    ModalComplePushQuestion : false,
    classCode : ""
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search).q; //class code
    this.setState({
      classCode : query
    })
    this.toggleLoading();
    setTimeout(this.toggleLoading, 1000);
  }

  ToggleModalComplePushQuestion = () => {
    this.setState({
      ModalComplePushQuestion : !this.state.ModalComplePushQuestion
    })
  }
  render() {
    return (
      <Container>
        {this.state.loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : (
          <>
            {queryString.parse(this.props.location.search).q && <h3 style={{ textAlign: "center" }}>Chú ý, đang thêm câu hỏi vào bộ đề luyện tập của Class: "{queryString.parse(this.props.location.search).q}"</h3>}
            {!(queryString.parse(this.props.location.search).q) && <h3 style={{ textAlign: "center" }}>Chú ý, đang thêm câu hỏi vào bộ đề thi</h3>}
            <SubmitQuestionForm classCode={this.state.classCode}  ModalComplePushQuestion ={this.state.ModalComplePushQuestion} onToggle = {this.ToggleModalComplePushQuestion}></SubmitQuestionForm>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button color="danger" onClick={this.ToggleModalComplePushQuestion}>Hoàn Thành</Button>
            </div>
          </>
        )}
      </Container>
    );
  }
}

export default withRouter(AddQuestion);