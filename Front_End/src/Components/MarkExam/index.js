import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { getTakenTest, getClass } from "../../Action/class"
import {
    Container,
    Button,
    Card,
    CardHeader,
    // CardFooter,
    CardBody,
    // CardText, 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap"
import queryString from "query-string";
import Essay from '../QuestItem/essay';
import { Scrollbars } from 'react-custom-scrollbars';


class MarkExam extends Component {

    state = {
        isDropdownOpen: false,
        listStudent: [],
        listTest: [],
        displayTest: {
            student: "",
            listQuiz: [],
            listEssay: [],
        }
    }

    nextDisplayTest = student => {
        if (this.state.listStudent.indexOf(student) < this.state.listStudent.length - 1) {
            this.onToggleDisplayTest(this.state.listStudent[this.state.listStudent.indexOf(student) + 1])
        }
    }

    preDisplayTest = student => {
        if (this.state.listStudent.indexOf(student) > 0) {
            this.onToggleDisplayTest(this.state.listStudent[this.state.listStudent.indexOf(student) - 1])
        }
    }

    onToggleDropDown = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        })
    }

    onToggleDisplayTest = student => {
        const studentTest = this.state.listTest.filter(item => item.studentEmail === student)
        this.setState(Object.assign(this.state.displayTest, {
            student: student,
            listQuiz: studentTest.length > 0 ? studentTest[0].quest.filter(item => item.model == "quiz") : [],
            listEssay: studentTest.length > 0 ? studentTest[0].quest.filter(item => item.model == "essay") : [],
        }))
    }

    fetchData = async () => {
        const testID = queryString.parse(this.props.location.search).q
        const classID = queryString.parse(this.props.location.search).c
        let takenTestList = [], fetchedClass = []
        try {
            takenTestList = await getTakenTest(testID)
            fetchedClass = await getClass(classID)
        } catch (err) {
            console.log(err.message)
        }
        this.setState({
            listStudent: fetchedClass.listOfStudent,
            listTest: [...takenTestList.test],
            displayTest: {
                student: takenTestList.test.length > 0 ? takenTestList.test[0].studentEmail : "NO STUDENT FOUND",
                listQuiz: takenTestList.test.length > 0 ? takenTestList.test[0].quest.filter(item => item.model == "quiz") : [],
                listEssay: takenTestList.test.length > 0 ? takenTestList.test[0].quest.filter(item => item.model == "essay") : [],
            }
        })
    }

    componentDidMount() {
        this.fetchData();
    }
    render() {
        console.log(this.state)
        return (
            <Container className="d-flex justify-content-center">
                <Card
                    className="mt-5"
                    style={{
                        minWidth: "100%",
                        minHeight: "80vh",
                        WebkitTransform: "translateY(0px)"
                    }}
                >
                    <CardHeader
                        className="d-flex justify-content-between"
                        style={{
                            minHeight: "8vh"
                        }}
                    >
                        <Button
                            onClick={() => this.preDisplayTest(this.state.displayTest.student)}
                        ><i className="fas fa-arrow-left"></i></Button>
                        <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.onToggleDropDown} >
                            <DropdownToggle caret>
                                <span className="pr-2" style={{ fontSize: "1.5em" }}>{this.state.displayTest.student}</span>
                            </DropdownToggle>
                            <DropdownMenu
                                modifiers={{
                                    setMaxHeight: {
                                        enabled: true,
                                        order: 890,
                                        fn: (data) => {
                                            return {
                                                ...data,
                                                styles: {
                                                    ...data.styles,
                                                    overflow: 'auto',
                                                    maxHeight: 250,
                                                },
                                            };
                                        },
                                    },
                                }}
                            >
                                {this.state.listStudent.map(item => {
                                    return <DropdownItem key={item} onClick={() => this.onToggleDisplayTest(item)}>{item}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            onClick={() => this.nextDisplayTest(this.state.displayTest.student)}
                        ><i className="fas fa-arrow-right"></i></Button>
                    </CardHeader>
                    <div className="row">
                        <CardBody
                            className="col-8"
                            style={{ minHeight: "60vh" }}
                        >
                            <Scrollbars
                                // universal
                                autoHide
                                // Hide delay in ms
                                autoHideTimeout={1500}
                                // Duration for hide animation in ms.
                                autoHideDuration={800}
                                style={{ height: "70vh" }}
                            >
                                {this.state.displayTest.listEssay.length > 0
                                    ?
                                    <div className="pl-2 pr-4">
                                        {this.state.displayTest.listEssay.map((item, index) => {
                                            return <Essay key={index} data={item} />
                                        })}
                                    </div>
                                    :
                                    <h3 style={{ textAlign: "center" }}>No essay found</h3>
                                }

                            </Scrollbars>
                        </CardBody>
                        <CardBody
                            className="col-3"
                            style={{
                                minHeight: "72vh",
                                borderLeft: "1px solid rgba(0, 0, 0, 0.125)",
                            }}
                        >asdasdda</CardBody>
                    </div>
                </Card>
            </Container>
        )
    }
}

export default withRouter(MarkExam)