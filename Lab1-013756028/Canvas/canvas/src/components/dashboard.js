import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../styles/dashboard.css'
import Navbar from '../components/LandingPage/Navbar';

//Define a Login Component
class dashboard extends Component {
    //call the constructor method
    constructor() {
        //Call the constrictor of Super class i.e The Component
        super();
        this.state = {
            courses: [],
            student_id: '',
            faculty_id: '',
            student_or_faculty: ''
        }

    }

    componentDidMount = async () => {

        if (localStorage.getItem('student_or_faculty') == 'student') {
            await this.setState({
                student_id: localStorage.getItem('student_id'),
                student_or_faculty: 'student'
            });
        }
        else {
            await this.setState({
                faculty_id: localStorage.getItem('faculty_id'),
                student_or_faculty: 'faculty'
            });
        }

        const data = {
            student_id: this.state.student_id,
            faculty_id: this.state.faculty_id,
            student_or_faculty: localStorage.getItem('student_or_faculty')
        }
        console.log('here' + this.state.faculty_id)
        console.log('here1' + this.state.student_or_faculty)
        await axios.post('http://localhost:3001/courses', data)
            .then((response) => {
                //update the state with the response data
                if (this.state.courses == '') {
                    this.setState({
                        courses: this.state.courses.concat(response.data)
                    });
                }
                console.log('here :' + this.state.courses)
            });
    }

    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }

        let courses = this.state.courses.map(course => {
            if (course.registration_status != null || this.state.student_or_faculty == 'faculty') {
                return (
                    <div class='col-md-3'>
                        <div class='empty_tile' style={{ backgroundColor: course.course_color }}></div>
                        <div class='empty_tile1'>
                            <a onClick={store_local => { localStorage.setItem('course_id', course.course_id) }}
                                href='./courses_page'><h4>{course.course_name}</h4></a>
                            <br></br>
                            <br></br>
                            <span class='fa fa-bullhorn fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class='fa fa-university fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class='fa fa-comment fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class='fa fa-folder fa-2x'></span>

                        </div>
                    </div>
                )
            }
        })

        return (

            <div>
                <Navbar />
                {redirectVar}
                <div>
                    <div class='col-md-11'><h2>Dashboard</h2></div>
                </div>

                <div>{courses}</div>
            </div>
        )
    }
}
//export Login Component
export default dashboard;