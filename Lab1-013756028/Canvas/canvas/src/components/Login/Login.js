import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../styles/login.css'


//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            student_or_faculty: 'student',
            new_studentid: '',
            new_password: '',
            new_email: '',
            new_student_or_faculty: 'student',
            authFlag: false,
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    new_studentidChangeHandler = (e) => {
        this.setState({
            new_studentid: e.target.value
        })
    }

    new_passwordChangeHandler = (e) => {
        this.setState({
            new_password: e.target.value
        })
    }

    new_emailChangeHandler = (e) => {
        this.setState({
            new_email: e.target.value
        })
    }

    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    faculty_or_student_changehandler = (e) => {
        this.setState({
            student_or_faculty: e.target.value
        })
    }

    new_faculty_or_student_changehandler = (e) => {
        this.setState({
            new_student_or_faculty: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            student_or_faculty: this.state.student_or_faculty
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log('here')
                    if (this.state.student_or_faculty == 'student') {
                        localStorage.setItem('student_id', this.state.username)
                        localStorage.setItem('student_or_faculty', this.state.student_or_faculty)
                    }
                    else {
                        localStorage.setItem('faculty_id', this.state.username)
                        localStorage.setItem('student_or_faculty', this.state.student_or_faculty)
                    }
                    this.setState({
                        authFlag: true
                    })
                }
                else {
                    console.log('here')
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }

    new_submit = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            new_email: this.state.new_email,
            new_password: this.state.new_password,
            new_studentid: this.state.new_studentid,
            new_student_or_faculty: this.state.new_student_or_faculty
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/new_user', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log('Success')
                }
                else {
                    console.log('Failure')
                }
            });
    }

    render() {
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/dashboard" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container" className='col-md-11'>
                    <center>
                        <div class='row container' style={{ marginTop: '20px', marginBottom: '50px', width: '400px', minWidth: '300px', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' }}>
                            <h1 style={{ fontSize: '24px', fontWeight: 'lighter', justifyContent: 'center' }}>Connecting to &nbsp;
                        <img style={{ width: '62.4px', height: '26px', alignItems: 'center' }} src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7"></img>
                            </h1>
                            <p style={{ fontSize: '14px', justifyContent: 'center' }}>Sign-in with your San Jose State University account to access SJSU Single Sign-on</p>
                        </div>
                    </center>
                    <center>
                        <div class='abcmain'>
                            <div class='body'>
                                <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                    <img style={{ maxWidth: '200px', maxHeight: '40px', marginLeft: 'auto', marginRight: 'auto' }} src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7"></img>
                                </div>
                                <div class='z'>
                                    <div style={{ justifyContent: 'center' }}>
                                        <div> <h4 >Sign In</h4> </div>
                                        <div style={{ marginBottom: '30px' }}><input style={{ width: '250px', height: '30px' }} onChange={this.usernameChangeHandler} type='text' placeholder='SJSU ID Number'></input></div>
                                        <div style={{ marginBottom: '15px' }}><input style={{ width: '250px', height: '30px' }} onChange={this.passwordChangeHandler} type='text' placeholder='Password'></input></div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <select onChange={this.faculty_or_student_changehandler}>
                                                <option selected='selected' value='student'>Student</option>
                                                <option value='faculty'>Faculty</option>
                                            </select>
                                        </div>
                                        <div style={{ marginBottom: '15px' }}><input id='check' type='checkbox'></input><label for='check' >Remember Me</label></div>
                                        <div style={{ marginBottom: '15px' }}><button onClick={this.submitLogin} style={{ width: '250px' }} class='btn btn-primary' type='button'>Sign In</button> </div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <button  style={{ width: '250px' }} class='btn btn-primary' type='button' data-toggle="modal" data-target="#myModal">Sign Up New User</button>
                                        </div>
                                        <div class="modal fade" id="myModal" role="dialog">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div style={{ backgroundColor: 'yellow' }} class="modal-header">
                                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                        <h4 class="modal-title">Sign Up</h4>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div style={{ marginBottom: '5%' }}>
                                                            <input onChange={this.new_studentidChangeHandler} type='text' required='required' name='new_student_id' placeholder='Student ID'></input>
                                                        </div>
                                                        <div style={{ marginBottom: '5%' }}>
                                                            <input onChange={this.new_passwordChangeHandler} type='text' required='required' name='new_password' placeholder='Password'></input>
                                                        </div>
                                                        <div>
                                                            <input onChange={this.new_emailChangeHandler} type='text' required='required' name='new_email' placeholder='Email'></input>
                                                        </div>
                                                        <div style={{ marginBottom: '5%' }}>
                                                            <select onChange={this.new_faculty_or_student_changehandler}>
                                                                <option selected='selected' value='student'>Student</option>
                                                                <option value='faculty'>Faculty</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <center>
                                                            <button onClick={this.new_submit} class="btn btn-default" data-dismiss="modal">Submit</button>
                                                        </center>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <a style={{ marginBottom: '15px' }} href='#'>Need help Signing in?</a><br></br>
                                            <a style={{ marginBottom: '15px' }} href='#'>Reset my password </a><br></br>
                                            <a href='#'>Help</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </center>

                    <div class="row">
                        <span class='col col-sm-2'> Powered by Okta </span>
                        <span class='col col-sm-8'></span>
                        <span class='col col-sm-2'>Privacy Policy</span>

                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Login;