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
  Alert,
  Spinner
} from "reactstrap";


class ModalTakeTest extends React.Component {
  constructor() {
    super();
    this.state = {
        classCode : "",
        loading: false
    };
  }

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };

  setStatetoOrigin = () => {
    this.setState({
      classCode : ""
    });
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };



  takeTest = async () => {
    this.toggleLoading();
    setTimeout(async () => {
      await this.props.takeTest(this.state);
      this.toggleLoading();
      if (this.props.testStatus === true) {
        this.setStatetoOrigin();
      }
    }, 1000);
  };

  onToggle = () => {
    this.props.onToggle();
    this.setStatetoOrigin();
  };
  render() {
    return (
      <Modal isOpen={this.props.visible} toggle={this.onToggle}>
        <ModalHeader>ENROLL TEST</ModalHeader>
        <ModalBody>
          {this.props.testStatus === true && (
            <Alert color="success">ENROLL SUCCESSFUL.</Alert>
          )}
          {this.props.testStatus === false && (
            <Alert color="danger">
            FALSE. <em>ENROLLMENT CODE ARE INCORRECT</em>.
            </Alert>
          )}
          <Form>
            <FormGroup>
              <Label for="classcode">Class Code or Test Code</Label>
              <Input
                type="password"
                name="classcode"
                id="classcode"
                placeholder="classcode"
                onChange={event => {
                  this.onChange({ classCode: event.target.value });
                }}
                value={this.state.classCode}
              />
            </FormGroup>
          </Form>

          {this.state.loading && 
            <div style={{ textAlign: "center" }}>
              <Spinner style={{ width: "3rem", height: "3rem" }} />
            </div>}
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={this.state.loading}
            color="primary"
            onClick={this.takeTest}
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

export default ModalTakeTest;
