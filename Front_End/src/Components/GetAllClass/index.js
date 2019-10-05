import React from "react";
import {
  Card,
  //   CardImg,
  //   CardText,
  CardBody,
  //   CardTitle,
  //   CardSubtitle,
  Button,
  Media,
  Container
} from "reactstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getOwnedClass } from "../../Action/class";

class GetAllClass extends React.Component {
  state = {
    listOwnedClass: []
  };
  fetchClassResult = async () => {
    {
      const rollOfUser = queryString.parse(this.props.location.search).q; //roll of teacher
      const emailOfUser = queryString.parse(this.props.location.search).d;
      try {
        const response = await getOwnedClass(rollOfUser, emailOfUser);
        this.setState({
          listOwnedClass: response
        });
      } catch (err) {
        console.log("get class err");
      }
    }
  };
  async componentDidMount() {
    this.fetchClassResult();
  }
  render() {
    return (
      <Container>
        {this.state.listOwnedClass.map((item, index) => {
          return <ClassForm
            key = {index}
            classCode={item.classCode}
            teacher={item.listOfTeacher[0]}
            totalStudentsNumber={item.listOfStudent.length}
            getClass = {this.props.getClass}
          ></ClassForm>;
        })}
      </Container>
    );
  }
}

function ClassForm(props) {
  const { classCode, teacher, totalStudentsNumber, getClass } = props;
  return (
    <div>
      <Card>
        <CardBody>
          <Media>
            <Media left href="#">
              <i className="fas fa-user fa-5x"></i>
            </Media>
            <Media body>
              <Media heading>Class : {classCode}</Media>
              Môn học : <br />
              Số lượng học sinh : {totalStudentsNumber} <br />
              Giảng viên chính : {teacher}
              <br />
            </Media>
          </Media>
          <br />
          <Button onClick={() => getClass(classCode)}>See Class</Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default withRouter(GetAllClass);
