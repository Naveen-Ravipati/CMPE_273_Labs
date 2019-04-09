import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../styles/dashboard.css'
import Navbar from '../components/LandingPage/Navbar';
import Conversation from './Conversation'

//Define a Login Component
class message_to extends Component {
    //call the constructor method
    constructor() {
        //Call the constrictor of Super class i.e The Component
        super();
        this.state = {
            from: '',
            from_student_or_faculty: '',
            to: '',
            to_student_or_faculty: '',
            students_list: [],
            faculty_list: []
        }

    }

    stateset_student = async(val,e) =>{
        await this.setState({
            to:val,
            to_student_or_faculty:'student'
        })
    }

    stateset_faculty = async(val,e) =>{
        await this.setState({
            to:val,
            to_student_or_faculty:'faculty'
        })
    }

    componentDidMount = async () => {

        if (localStorage.getItem('student_or_faculty') == 'student') {
            await this.setState({
                from: localStorage.getItem('student_id'),
                from_student_or_faculty: 'student'
            });
        }
        else {
            await this.setState({
                from: localStorage.getItem('faculty_id'),
                from_student_or_faculty: 'faculty'
            });
        }
        const data = {
            id: this.state.from,
            student_or_faculty: this.state.from_student_or_faculty
        }
        await axios.post('http://localhost:3001/students_list', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    students_list: response.data
                })
                console.log(this.state.students_list)
            });
        await axios.post('http://localhost:3001/faculty_list', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    faculty_list: response.data
                })
                console.log(this.state.students_list)
            });
    }


    render() {
        let students_list = this.state.students_list.map(student => {
            return (
                <tr>
                    <td onClick = {this.stateset_student.bind(this,student.student_id)}>{student.name}</td>
                </tr>
            )
        })

        let faculty_list = this.state.faculty_list.map(faculty => {
            return (
                <tr>
                    <td onClick = {this.stateset_faculty.bind(this,faculty.faculty_id)}>{faculty.name}</td>
                </tr>
            )
        })

        return (
            <div>
                <Navbar />

                <div class='col-md-3'><h2>Message to:</h2>
                    <div>
                        <h4>Students</h4>
                        {students_list}
                    </div>
                    <div>
                        <h4>Faculty</h4>
                        {faculty_list}
                    </div>
                </div>
                <div class= 'col-md-3'>
                    <Conversation to = {this.state.to} to_student_or_faculty = {this.state.to_student_or_faculty}/>
                </div>
            </div>
        )
    }
}
//export Login Component
export default message_to;