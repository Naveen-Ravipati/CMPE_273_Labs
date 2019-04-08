import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import Navbar from './LandingPage/Navbar';
import dashboard from './dashboard'



//Define a Login Component
class add_course extends Component {
    //call the constructor method
    constructor() {
        //Call the constrictor of Super class i.e The Component
        super();
        this.state = {
            faculty_id:'',
            course_id: '',
            course_name: '',
            course_department: '',
            course_description: '',
            course_room: '',
            course_capacity: '',
            waitlist_capacity: '',
            course_term: '',
            course_color: '',
            number_enrolled: '',
            waitlist_status: '',
            redirectVar:'false'

        }

    }

    ChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = async(event) => {
        event.preventDefault();
        // await this.setState({
        //     faculty_id:localStorage.getItem('faculty_id')
        // })
        let redirectVar = <Redirect to="/dashboard" />

        axios.post('http://localhost:3001/add_course/', this.state)
            .then(response => {
                if (response.status === 200) {
                    console.log('Courses Added successfully!')
                    this.setState({
                        redirectVar:'true'
                    })
                }
                console.log(this.state.redirectVar)
            });
    }


    render() {
        let redirectVar = null
        if (this.state.redirectVar == 'true') {
            redirectVar = <Redirect to="/dashboard" />
        }

        return (
            <div>
                {redirectVar}
                <Navbar />
                <div className='col-md-5' style={{ marginTop: '2%', border:'1px solid grey ' }}>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="Faculty ID">Faculty ID</label>
                                <input onChange={this.ChangeHandler} name='faculty_id' class="form-control" id="Faculty ID" placeholder="Faculty ID" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Course ID">Course ID</label>
                                <input onChange={this.ChangeHandler} name='course_id' class="form-control" id="Course ID" placeholder="Course ID" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="Course Name">Course Name</label>
                                <input onChange={this.ChangeHandler} class="form-control" name='course_name' id="Course Name" placeholder="Course Name" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Course Department">Course Department</label>
                                <input onChange={this.ChangeHandler} name='course_department' class="form-control" id="Course Department" placeholder="Course Department" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="Course Description">Course Description</label>
                                <input onChange={this.ChangeHandler} class="form-control" name='course_description' id="Course Description" placeholder="Course Description" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Course Room">Course Room</label>
                                <input onChange={this.ChangeHandler} name='course_room' class="form-control" id="Course Room" placeholder="Course Room" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="Course Capacity">Course Capacity</label>
                                <input onChange={this.ChangeHandler} class="form-control" name='course_capacity' id="Course Capacity" placeholder="Course Capacity" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Waitlist Capacity">Waitlist Capacity</label>
                                <input onChange={this.ChangeHandler} name='waitlist_capacity' class="form-control" id="Course Department" placeholder="Course Department" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="Course Term">Course Term</label>
                                <input onChange={this.ChangeHandler} class="form-control" name='course_term' id="Course Term" placeholder="Course Term" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Course Color">Course Color</label>
                                <input onChange={this.ChangeHandler} name='course_color' class="form-control" id="Course Color" placeholder="Course Color" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="Number Enrolled">Number Enrolled</label>
                                <input onChange={this.ChangeHandler} class="form-control" name='number_enrolled' id="Number Enrolled" placeholder="Number Enrolled" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Waitlist Status">Waitlist Status</label>
                                <input onChange={this.ChangeHandler} name='waitlist_status' class="form-control" id="Waitlist Status" placeholder="Waitlist Status" />
                            </div>
                        </div>
                        <center>
                            <div>
                                <button onClick={this.submit}>Submit</button>
                            </div>
                        </center>   
                    </form>
                </div>
            </div>
        )
    }
}

//export Login Component
export default add_course;