import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router';
import '../../styles/navbar.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            courses: [],
            student_or_faculty: '',
            faculty_id: '',
            student_id: '',
        }

    }
    //handle logout to destroy the cookie
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear()
        cookie.remove('cookie', { path: '/' })
        this.setState(
            {
                redirectVar : <Redirect to="/login" />
            })
    }

    toggle_account_sidebar = () => {
        var element = document.getElementById("transform");
        element.classList.toggle("transform-active");
    }


    toggle_courses_sidebar = async () => {
        const data = {
            student_or_faculty: localStorage.getItem('student_or_faculty'),
            faculty_id: localStorage.getItem('faculty_id'),
            student_id: localStorage.getItem('student_id')
        }

        await this.setState({
            student_or_faculty: localStorage.getItem('student_or_faculty'),
            faculty_id: localStorage.getItem('faculty_id')

        })
        axios.post('http://localhost:3001/courses', data)
            .then((response) => {
                console.log(response.data)
                //update the state with the response data
                if (this.state.courses == '') {
                    this.setState({
                        courses: this.state.courses.concat(response.data)
                    });
                }
            }).then(response => {
                console.log('Navbar page : ' + this.state.courses)
                var element = document.getElementById("transform_courses");
                element.classList.toggle("transform-active");
            })

    }


    render() {

        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }

        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }

        let courses = this.state.courses.map(course => {
            if (course.registration_status != null || this.state.student_or_faculty == 'faculty') {
                return (
                    <div>
                        <a onClick={store_local => { localStorage.setItem('course_id', course.course_id) }}
                            href='./courses_page'><h4>{course.course_name}</h4></a>
                    </div>
                )
            }
        })
        return (
            <div className="col-md-1">
                <div id='transform' class="box transform">
                    <div>
                        <center>
                            {/* <button onClick = {this.handleLogout}>Logout</button> */}
                            {navLogin}
                        </center>
                    </div>
                    {this.state.redirectVar}
                    <hr></hr>
                    <ul> <div class='profile'>
                        <list><a class='btn btn-primary profile' href='./edit_profile'>Profile</a></list><br></br></div>
                        <div class='profile'>
                            <list><a href='#'>Settings</a></list><br></br></div>
                        <div class='profile'>
                            <list><a href='#'>Notifications</a></list><br></br></div>
                        <div class='profile'>
                            <list><a href='#'>Files</a></list><br></br></div>
                        <div class='profile'>
                            <list><a href='#'>ePortfolios</a></list></div>
                    </ul>

                </div>
                <div id='transform_courses' class="box transform">
                    <div><h1>Courses!</h1> </div><hr></hr>
                    <div>{courses}</div>
                    <div><h2> Register for Courses</h2></div>
                    <div><a href='./course_register'>Register</a></div>
                </div>
                <nav class="navbar abc">
                    <div class>
                        <div>
                            <a href="#">
                                <img class='list_header' src={require('../../Images/logo.PNG')}></img>
                            </a>
                        </div>
                        <ul class="nav navbar-nav">
                            <li class="dropdown-toggle list_size" data-toggle="dropdown" >
                                <a onClick={this.toggle_account_sidebar}>
                                    <span class='fa fa-address-book fa-2x'>
                                    </span>
                                    <div style={{ fontSize: '15px' }}>
                                        Account
                                    </div>
                                </a>
                            </li>
                            <li>

                            </li>
                            <li class='list_size'>
                                <a href='./dashboard'>
                                    <span class='fa fa-tachometer fa-2x'>
                                    </span>
                                    <div style={{ fontSize: '15px' }}>
                                        Dashboard
                                        </div>
                                </a>
                            </li>
                            <li class='list_size'>
                                <a onClick={this.toggle_courses_sidebar}>
                                    <span class='fa fa-book fa-2x'>
                                    </span>
                                    <div style={{ fontSize: '15px' }}>
                                        Courses
                                        </div>
                                </a>
                            </li>
                            <li class='list_size'>
                                <a href='#'>
                                    <span class='fa fa-calendar fa-2x'>
                                    </span>
                                    <div style={{ fontSize: '15px' }}>
                                        Calendar
                                </div>
                                </a>
                            </li>
                            <li class='list_size'>
                                <a href='#'>
                                    <span class='fa fa-inbox fa-2x'>
                                    </span>
                                    <div style={{ fontSize: '15px' }}>
                                        Inbox
                                </div>
                                </a>
                            </li>
                            <li class='list_size'>
                                <a href='#'>
                                    <span class='fa fa-question fa-2x'>
                                    </span>
                                    <div style={{ fontSize: '15px' }}>
                                        Help
                                </div>
                                </a>
                            </li>
                            <li class='list_size'>
                                <a href='#'>
                                    <span class='fa fa-book fa-2x'>
                                    </span>
                                    <div style={{ fontSize: '15px' }}>
                                        Library
                                </div>
                                </a>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;