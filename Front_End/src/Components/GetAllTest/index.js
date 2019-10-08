import React, { Component } from 'react'
import queryString from "query-string"
import { withRouter } from "react-router-dom"
import { getTest } from "../../Action/class"
import {
    Card,
    //   CardImg,
    //   CardText,
    CardBody,
    CardHeader,
    CardTitle,
    //   CardSubtitle,
    Button,
    Media,
    Container,
    Table
} from "reactstrap";
import { getListQuest } from "../../Action/getQuest"

class GetAllTest extends Component {

    state = {
        listTest: []
    }

    onClick = async (listOfQuizQuest, listOfEssayQuest) => {
        const res = await getListQuest(listOfQuizQuest, listOfEssayQuest)
        console.log(res)
    }

    fetchAllTest = async () => {
        const classCode = queryString.parse(this.props.location.search).q
        try {
            const response = await getTest(classCode)
            this.setState({
                listTest: response
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    componentDidMount() {
        this.fetchAllTest()
    }

    render() {
        console.log(this.state)
        return (
            <Container>
                <h3 style={{ textAlign: "center" }}>
                    Chú ý, đang xem các đề thi của Class: "{queryString.parse(this.props.location.search).q}"
                </h3>
                <br />
                <hr />
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Title</th>
                            <th>Teacher</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listTest.map((item, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.authedUser.userName}</td>
                                <td>
                                    
                                    <Button
                                        outline
                                        className="float-left"
                                        color="danger"
                                        style={{ marginRight: 5, borderRadius: 50 }}
                                    ><i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </Table>
                                
                {/* {this.state.listTest.map((item, index) => {
                    return <TestForm
                        key={index}
                        data={item}
                        onClick={this.onClick}
                    ></TestForm>
                })} */}

            </Container>
        )
    }
}

export default withRouter(GetAllTest)

function TestForm(props) {
    const { data, onClick } = props

    return (
        <Card>
            <CardHeader tag="h3" >
                <CardTitle className="d-inline-block">{data.title}</CardTitle>
                <Button
                    outline
                    // style={{ backgroundColor:  }}
                    className="float-right"
                    color="danger"
                    style={{ marginRight: 5, borderRadius: 50 }}
                    onClick={() => onClick(data.listOfQuizQuest, data.listOfEssayQuest)}
                ><i className="fas fa-trash"></i>
                </Button>
            </CardHeader>
            <CardBody>{data.description}</CardBody>
        </Card>
    )
}