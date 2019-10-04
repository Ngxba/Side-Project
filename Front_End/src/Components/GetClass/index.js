import React, { Component } from 'react';
import {withRouter} from "react-router-dom"
import queryString from "query-string"
import {getClass} from "../../Action/class"
// import ListUser from "../ListUser"

class GetClass extends Component {

    state = {
        classCode : "",
        listOfStudent : [],
        listOfTeacher :[],
        QuestPool : []
    }
    async componentDidMount(){
        this.fetchClassResult()
    }
    fetchClassResult= async () =>{
        {
            const query = queryString.parse(this.props.location.search).q; //class code
            try{

                const response = await getClass(query)
                console.log(response)
                this.setState({
                    classCode : response.classCode,
                    listOfTeacher : response.listOfTeacher,
                    listOfStudent : response.listOfStudent,
                    QuestPool : response.poolQuest
                })
            } catch (err) {
                console.log("get class err")
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.search !== this.props.location.search) {
            this.fetchClassResult()
        }
    }

    render() {
        return (
            <div>
                <h2>Wellcome to class "{queryString.parse(this.props.location.search).q}":</h2>
                Teacher
                <ul>
                    {this.state.listOfTeacher.map(teacher => <li>{teacher}</li> )}
                </ul>
                Student
                <ul>
                    {this.state.listOfStudent.map(student => <li>{student}</li> )}
                </ul>
                <hr/>
                {/* <div listUsers={this.state.searchResult}></div> */}
            </div>
        )
    }
}

export default withRouter(GetClass);
