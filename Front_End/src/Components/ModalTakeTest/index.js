import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Spinner
} from "reactstrap";


class ModalTakeTest extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  onSubmit = () => {
    this.toggleLoading();
    this.props.onSubmit();
    setTimeout(() => {
      this.toggleLoading();
      this.props.history.push(`/class/getalltest?q=${this.props.classCode}`)
    }, 1000)
  }

  render() {
    return (
      <Modal isOpen={this.props.visible} toggle={this.props.onToggle}>
        <ModalHeader>ENROLL TEST</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              {this.props.isQuizUndone || this.props.isEssayUndone
                ?
                <>
                  <h4>Bạn còn một số câu chưa làm</h4>
                  <hr />
                  {this.props.isQuizUndone
                    &&
                    <div>
                      <span>câu hỏi trắc nghiệm số: </span>
                      {this.props.undoneQuests.quiz.map((item, index) => {
                        return <span key={item}>{item}{index + 1 < this.props.undoneQuests.quiz.length && ", "}</span>
                      })}
                    </div>
                  }
                  {this.props.isEssayUndone
                    &&
                    <div>
                      <span>câu hỏi trắc tự luận số: </span>
                      {this.props.undoneQuests.essay.map((item, index) => {
                        return <span key={item}>{item}{index + 1 < this.props.undoneQuests.essay.length && ", "}</span>
                      })}
                    </div>
                  }
                </>
                :
                <h3>Bạn còn ??? thời gian</h3>
                }
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="pt-2 pb-2">
          {this.state.loading
            ?
            <Spinner className="mr-4" style={{ width: "3rem", height: "3rem" }} />
            :
            <Button
              disabled={this.state.loading}
              color="primary"
              onClick={this.onSubmit}
            >Submit</Button>
          }
          {" "}
          <Button className="mr-2" color="secondary" onClick={this.props.onToggle}>
            Continue
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalTakeTest;
