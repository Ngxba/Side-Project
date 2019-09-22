import React, { Component } from "react";
import { Container, Button, Spinner } from "reactstrap";
// import QuestionFrom from "../QuestionForm"
import SubmitQuestionForm from "../SubmitQuestionForm";

export default class AddQuestion extends Component {
  state = {
    loading: false
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  componentDidMount() {
    this.toggleLoading();
    setTimeout(this.toggleLoading, 1000);
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
            <SubmitQuestionForm></SubmitQuestionForm>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button color="danger">Hoàn Thành</Button>
            </div>
          </>
        )}
      </Container>
    );
  }
}
