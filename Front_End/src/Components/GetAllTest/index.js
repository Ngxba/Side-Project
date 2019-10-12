import React, { Component } from 'react'
import queryString from "query-string"
import { withRouter } from "react-router-dom"
import { getTest, deleteTest } from "../../Action/class"
import {
    // Card,
    //   CardImg,
    //   CardText,
    // CardBody,
    // CardHeader,
    // CardTitle,
    //   CardSubtitle,
    Button,
    // Media,
    Container,
    Table,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import { getListQuest } from "../../Action/getQuest"
import QuestItem from "../QuestItem"

class GetAllTest extends Component {

    state = {
        listTest: [],
        listQuest: [],
        modalListQuest: false,
        testNum: 0
    }

    onDeleteTest = async (testID) => {
        await deleteTest(testID)
        // var quests= this.state.listQuest
        // quests.filter(item => item._id !== testID)
        this.setState({
            listTest: this.state.listTest.filter(item => item._id !== testID)
        })
    }

    toggleModalListQuest = () => {
        this.setState({
            modalListQuest: !this.state.modalListQuest
        })
    }

    onGetListQuest = async (listOfQuizQuest, listOfEssayQuest, testNum) => {
        const res = await getListQuest(listOfQuizQuest, listOfEssayQuest)
        this.setState({
            listQuest: res,
            testNum: testNum
        })
        this.toggleModalListQuest()
    }

    onDeleteListQuest = () => {
        this.setState({
            listQuest: []
        })
        this.toggleModalListQuest()
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

    takeTest = (testID) => {
        const classCode = queryString.parse(this.props.location.search).q
        this.props.history.push(`/class/taketest?q=${testID}&&c=${classCode}`)
    }

    render() {
        return (
            <Container>
                <h3 style={{ textAlign: "center" }}>
                    Chú ý, đang xem các đề thi của Class: "{queryString.parse(this.props.location.search).q}"
                </h3>
                <br />
                <hr />
                <Table bordered hover>
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
                                        className="float-left"
                                        color="dark"
                                        style={{ marginRight: 5, borderRadius: 50 }}
                                        onClick={() => this.onGetListQuest(item.listOfQuizQuest, item.listOfEssayQuest, index)}
                                    ><i className="fas fa-pencil-alt"></i>
                                    </Button>
                                    <Button
                                        outline
                                        className="float-left"
                                        color="danger"
                                        style={{ marginRight: 5, borderRadius: 50 }}
                                        onClick={() => this.onDeleteTest(item._id)}
                                    ><i className="fas fa-trash"></i>
                                    </Button>
                                    <Button
                                        outline
                                        className="float-left"
                                        color="primary"
                                        style={{ marginRight: 5, borderRadius: 50 }}
                                        onClick={() => this.takeTest(item._id)}
                                    >Take Exam
                                    </Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                    <ModalListQuest
                        testNum={this.state.testNum}
                        isOpen={this.state.modalListQuest}
                        onToggle={this.toggleModalListQuest}
                        onCancel={this.onDeleteListQuest}
                        listQuest={this.state.listQuest}
                    />
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

function ModalListQuest(props) {
    const { isOpen, onToggle, onCancel, listQuest, testNum } = props

    return (
        <Modal isOpen={isOpen} toggle={onCancel} >
            <ModalHeader toggle={onCancel}>ĐỀ THI SỐ: {testNum + 1}</ModalHeader>
            <ModalBody>
                {listQuest[0] && <>
                    <h3 style={{ textAlign: "center" }}>
                        Câu hỏi Trắc nghiệm:
                    </h3>
                    <br />
                    <hr />
                    {listQuest[0].map((item, index) => {
                        return <QuestItem
                            key={index}
                            data={item}
                            numberOfQuizQuest={index + 1}
                        />
                    })}
                </>}
                {listQuest[1] && <>
                    <h3 style={{ textAlign: "center" }}>
                        Câu hỏi Tự luận:
                    </h3>
                    <br />
                    <hr />
                    {listQuest[1] && listQuest[1].map((item, index) => {
                        return <QuestItem
                            key={index}
                            data={item}
                            numberOfQuizQuest={index + 1}
                        />
                    })}
                </>}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onToggle}>Save</Button>{' '}
                <Button color="secondary" onClick={onCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}