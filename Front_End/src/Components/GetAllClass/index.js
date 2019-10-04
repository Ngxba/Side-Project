import React from "react";
import {
  Card,
  //   CardImg,
  //   CardText,
  CardBody,
  //   CardTitle,
  //   CardSubtitle,
  Button,
  Media
} from "reactstrap";
import {withRouter} from "react-router-dom"
import queryString from "query-string"
import {getOwnedClass} from "../../Action/class"

class GetAllClass extends React.Component {
  fetchClassResult = async () => {
    {
      const rollOfUser = queryString.parse(this.props.location.search).q; //roll of teacher
      const emailOfUser = queryString.parse(this.props.location.search).d
      // console.log(emailOfUser)
      try {
        const response = await getOwnedClass(rollOfUser,emailOfUser);
        console.log(response);
        // this.setState({
        //   classCode: response.classCode,
        //   listOfTeacher: response.listOfTeacher,
        //   listOfStudent: response.listOfStudent,
        //   QuestPool: response.poolQuest
        // });
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
      <div>
        <ClassForm></ClassForm>
      </div>
    );
  }
}

function ClassForm(props) {
  const { classCode, teacher } = props;
  return (
    <div>
      <Card>
        <CardBody>
          <Media>
            <Media left href="#">
              <i className="fas fa-user fa-5x"></i>
            </Media>
            <Media body>
              <Media heading>Class : "AAAA"</Media>
              Môn học : <br />
              Số lượng học sinh : <br />
              Giảng viên chính : <br />
            </Media>
          </Media>
          <br />
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default withRouter(GetAllClass);
