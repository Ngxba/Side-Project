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
  Input,
} from "reactstrap";

class ModalAskTeacher extends React.Component {
    state = {
        numberOfQuizQuest : "",
        numberOfEssayQuest : ""
    }

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };

  onSubmit = () => {
        this.props.onSubmit(this.state)
        this.onToggle()
        console.log(this.state)
  };

  onToggle = () => {
    this.props.onToggle();
  };
  render() {
    return (
      <Modal isOpen={this.props.visible} toggle={this.onToggle}>
        <ModalHeader>Lựa chọn số câu hỏi</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="quiz">Số câu hỏi trắc nghiệm (max : {this.props.numberOfQuizQuest})</Label>
              <Input
                type="text"
                name="quiz"
                id="quiz"
                onChange={event => {
                  this.onChange({ numberOfQuizQuest: event.target.value });
                }}
                value={this.state.numberOfQuizQuest}
                placeholder="10"
              />
              <Label for="essay">Số câu hỏi tự luận (max : {this.props.numberOfEssayQuest})</Label>
              <Input
                type="text"
                name="essay"
                id="essay"
                placeholder="10"
                onChange={event => {
                  this.onChange({ numberOfEssayQuest: event.target.value });
                }}
                value={this.state.numberOfEssayQuest}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!(this.state.numberOfQuizQuest <= this.props.numberOfQuizQuest && this.state.numberOfEssayQuest <= this.props.numberOfEssayQuest)}
            color="primary"
            onClick={this.onSubmit}
          >
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={this.onToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalAskTeacher;
