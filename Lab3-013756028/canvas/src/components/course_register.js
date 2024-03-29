import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../styles/course_register.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import Navbar from './LandingPage/Navbar';



//Define a Login Component
class course_register extends Component {
    //call the constructor method
    constructor() {
        //Call the constrictor of Super class i.e The Component
        super();
        this.state = {
            course_term: 'fall',
            course_name: '',
            course_id: '',
            search_condition: 'greater',
            searched_courses: [],
            courses_registered: [],
            student_or_faculty: '',
            student_id: '',
            permission: 'false',
            visibility: 'hidden',
            toggle: 'visible',
            permission_numbers: [],
            permission_number_entered: ''
        }

    }

    course_term_ChangeHandler = (e) => {
        this.setState({
            course_term: e.target.value
        })
    }

    course_name_ChangeHandler = (e) => {
        this.setState({
            course_name: e.target.value
        })
    }

    course_id_ChangeHandler = (e) => {
        this.setState({
            course_id: e.target.value
        })
    }

    search_condition_ChangeHandler = (e) => {
        this.setState({
            search_condition: e.target.value
        })
    }

    permission_number_ChangeHandler = (e) =>{
        this.setState({
            permission_number_entered: e.target.value
        })
    }

    componentDidMount = async () => {
        var data = {
            'student_id': localStorage.getItem('student_id'),
        }
        var token = localStorage.getItem("token");
        axios.post('http://localhost:3001/course_register/', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        courses_registered: response.data.courses_registered
                    })
                }
                console.log('Courses Registered' + this.state.courses_registered)
            });
    }


    search_class = (event) => {
        var data =
        {
            'course_term': this.state.course_term,
            'course_name': this.state.course_name,
            'course_id': this.state.course_id,
            'search_condition': this.state.search_condition,
            'student_id': localStorage.getItem('student_id'),
            'student_or_faculty': localStorage.getItem('student_or_faculty')
        }
        var token = localStorage.getItem("token");
        axios.post('http://localhost:3001/search/', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        searched_courses: response.data
                    });
                }
            });
    }

    permission_number_delete = async(val) =>{
        const data={
            course_id: this.state.course_id,
            permission_number_to_delete: val 
        }
        await axios.post('http://localhost:3001/permission_number_delete/',data)
            .then(response => {
                if (response.status === 200) {
                    alert('Permission Number deleted')
                }
            })
    }

    permission_number = async (val1, val2) => {
        // alert('Permission Number Received')
        // alert('Course Added')
        const data = {
            course_id: this.state.course_id,
        }
        await axios.post('http://localhost:3001/permission_numbers_fetch/', data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        permission_numbers: response.data
                    })
                }
                console.log(this.state.permission_numbers)
            })
        var flg =0;
        for (let i = 0; i < 10; i++) {
            if (this.state.permission_numbers[i] == this.state.permission_number_entered) {
                this.register_drop_ChangeHandler(this.state.course_id, 'Register')
                flg = 1
                break
            }
        }
        if(flg == 1){
            alert('here')
            this.permission_number_delete(this.state.permission_number_entered)
        }
        else{
            alert('Permission Number is not valid')
        }
    }

    register_drop_ChangeHandler = async (val1, val2) => {

        if (localStorage.getItem('student_or_faculty') == 'student') {
            await this.setState({
                student_id: localStorage.getItem('student_id'),
                student_or_faculty: 'student'
            });
        }

        var data = {
            'course_id_register_drop': val1,
            'registration_status': val2,
            'student_id': this.state.student_id
        }
        console.log(data.course_id_register_drop)
        console.log('state' + data.registration_status)
        var token = localStorage.getItem("token");
        axios.post('http://localhost:3001/course_register/', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        courses_registered: response.data.courses_registered
                    })
                }
                console.log('Courses Registered' + this.state.courses_registered)
                this.search_class()
            });
    }

    render() {

        let searched_courses = this.state.searched_courses.map(course => {
            let registration_status = 'Register';
            let permission_number_visibility = 'hidden';
            let registration_status_visibility = 'visible';
            this.state.courses_registered.map(registered_course => {
                if (registered_course.course_id == course.course_id) {
                    registration_status = 'Drop'
                }
            })

            if (course.number_enrolled >= course.course_capacity && registration_status == 'Register') {
                permission_number_visibility = 'visible'
                registration_status_visibility = 'hidden'
            }

            return (
                <tr>
                    <td>{course.course_id}</td>
                    <td>{course.course_description}</td>
                    <td>{course.course_room}</td>
                    <td>{course.course_term}</td>
                    <td><button onClick={this.register_drop_ChangeHandler.bind(this, course.course_id, registration_status)} class='btn btn-primary' style={{ visibility: registration_status_visibility }} >{registration_status}</button></td>
                    <td><button data-toggle="modal" data-target="#myModal" class='btn btn-primary' style={{ visibility: permission_number_visibility }}>Request permission Number</button></td>
                    {/* <div style={{ marginBottom: '15px' }}>
                        <button style={{ width: '250px' }} class='btn btn-primary' type='button' data-toggle="modal" data-target="#myModal">Sign Up New User</button>
                    </div> */}
                    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div style={{ backgroundColor: '#337AB7' }} class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 style={{ color: 'black' }} class="modal-title">Register</h4>
                                </div>
                                <div class="modal-body">
                                    <div style={{ marginBottom: '5%' }}>
                                        <input onChange={this.course_id_ChangeHandler} type='text' required='required' name='course_id' placeholder='Course ID'></input>
                                    </div>
                                    <div style={{ marginBottom: '5%' }}>
                                        <input onChange={this.permission_number_ChangeHandler} type='text' required='required' name='permission_number_entered' placeholder='Permission Number'></input>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <center>
                                        <button onClick={this.permission_number} class="btn btn-default" data-dismiss="modal">Submit</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </tr>
            )

        })

        return (
            <div>
                {/* {redirectVar} */}
                <Navbar />
                <div className='col-md-11'>

                    <center>
                        <div class='course_register'>
                            <h4>Institution - San Jose State University </h4>
                            <select onChange={this.course_term_ChangeHandler}>
                                <option class='active' value='fall'>Fall</option>
                                <option value='spring'> Spring</option>
                            </select>
                        </div>
                    </center>
                    <div style={{ marginLeft: '35%', marginBottom: '1%' }}>
                        <div style={{ marginBottom: '1%' }}>
                            <label for='course_name'>  Course Name</label>
                            <input onChange={this.course_name_ChangeHandler} type='text' id='course_name'></input>
                        </div>
                        <div >
                            <label for='course_id'>  Course ID</label>
                            <select onChange={this.search_condition_ChangeHandler} id='course_id' style={{ marginRight: '5%' }}>
                                <option class='active' value='greater'>is greater than</option>
                                <option value='exactly'>is exactly</option>
                                <option value='lesser'>is less than</option>
                            </select>
                            <input onChange={this.course_id_ChangeHandler} type='number' id='id'></input>
                        </div>

                    </div>

                    <center>
                        <div>
                            <button onClick={this.search_class} type='submit'><i class='fa fa-search'></i>Search</button>
                        </div>
                    </center>
                    <div>
                        <div class="container">
                            <h2>Searched Courses</h2>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Course Description</th>
                                        <th>Course Room</th>
                                        <th>Course Term</th>
                                        <th>Registration Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searched_courses}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//export Login Component
export default course_register;