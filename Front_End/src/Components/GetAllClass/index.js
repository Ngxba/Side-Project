import React from "react";
import {
  Card,
  //   CardImg,
  //   CardText,
  CardBody,
    CardTitle,
  //   CardSubtitle,
  Button,
  Media,
  Container,
  Row, Col
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
        <div style={{height: "3em"}}></div>
        {this.state.listOwnedClass.length === 0 && <h2>You haven't participate in any class yet !</h2>}
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
        <CardTitle><Button onClick={() => getClass(classCode)} style={{width : "100%", height :"4em"}}> <p className="float-left"><strong>Class : {classCode}</strong></p><i className="fas fa-arrow-right float-right mt-2"></i></Button></CardTitle>
        <CardBody>
          <Media>
            {/* <Media left href="#">
              <i className="fas fa-user fa-5x"></i>
            </Media> */}
            <Media body>
              {/* <Row>Môn học :</Row><br/> */}
              <br/>
              <Row><i class="fas fa-user-friends fa-lg mr-2 ml-3"></i>Số lượng học sinh : {totalStudentsNumber}</Row> <br/>
              <Row><i class="fas fa-briefcase fa-lg mr-2 ml-3"></i>Giảng viên chính : {teacher}</Row> <br/>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </div>
  );
}

export default withRouter(GetAllClass);
