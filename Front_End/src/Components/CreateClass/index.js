import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  Alert
} from "reactstrap";
import {createNewClass} from "../../Action/class"

export default class CreateClass extends Component {
  state = {
    pushStatus: "not",
    classCode: "",
    Student: [{ order: 0, value: "" }],
    teacher: this.props.authedUser
  };
  addStudent = () => {
    this.setState(prev => ({
      Student: [
        ...prev.Student,
        {
          order: prev.Student.length,
          value: ""
        }
      ]
    }));
  };

  deleteStudent = () => {
    this.state.Student.pop();
    this.setState({
      Student: this.state.Student
    });
  };

  onChange = object => {
    this.setState(Object.assign(this.state, object));
  };

  onChangeStudent = (order, value) => {
    this.setState(prev => {
      const student = [...prev.Student];
      student[order - 1].value = value;
      return {
        Student: student
      };
    });
  };

  

  submit = async event => {
    event.preventDefault();
    
    try{
        await createNewClass(this.state.classCode, this.state.Student, this.state.teacher.userEmail)
        this.setState({
            pushStatus : true
        })
        
        setTimeout(()=>{this.props.getClass(this.state.classCode)},2000);
    } catch(er) {
        this.setState({
            pushStatus: false
        })
    }
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            {this.state.pushStatus === true && (
              <Alert color="success">Create Class SUCCESS</Alert>
            )}
            {this.state.pushStatus === false && (
              <Alert color="danger">Create Class FALSE</Alert>
            )}
            <h3>Tên giáo viên: {this.state.teacher.userName}</h3>
            <CardTitle>
              <FormGroup>
                <Label for="classCode">Class Code: </Label>
                <Input
                  type="text"
                  name="classCode"
                  id="classCode"
                  onChange={event => {
                    this.onChange({ classCode: event.target.value });
                  }}
                  value={this.state.classCode}
                  placeholder="class code"
                />
              </FormGroup>
              <Button>Add Teacher</Button>
            </CardTitle>
            <hr />
            <CardSubtitle>
              <h6>
                <em>Lưu ý : Mã lớp học không thể trùng</em>
              </h6>
            </CardSubtitle>
            <Form onSubmit={this.submit}>
              <hr />
              <CardText>
                <strong>Class's Student</strong>
              </CardText>
              <FormGroup>
                {this.state.Student.map(v => (
                  <Student
                    order={v.order + 1}
                    key={v.order}
                    value={v.value}
                    onChangeValue={this.onChangeStudent}
                  />
                ))}
                <br />
                <Button
                  outline
                  color="primary"
                  style={{ marginRight: 5 }}
                  className="float-right"
                  type="button"
                  onClick={this.addStudent}
                >
                  <i className="fas fa-plus"></i>
                </Button>
                <Button
                  outline
                  style={{ marginRight: 5 }}
                  color="primary"
                  className="float-right"
                  type="button"
                  onClick={this.deleteStudent}
                >
                  <i className="fas fa-minus"></i>
                </Button>
                <br/>
                <br />
                <br/>
                <Button type="submit" className="float-right">
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function Student(props) {
  const { order, onChangeValue, value } = props;
  let opacity = 1;
  if (value === "") {
    opacity = 0.5;
  }
  return (
    <>
      <Label style={{ opacity: opacity }}>Học sinh {order}:</Label>
      <Input
        type="text"
        name="text"
        onChange={e => onChangeValue(order, e.target.value)}
        value={value}
        style={{ opacity: opacity }}
        required={true}
      />
    </>
  );
}
