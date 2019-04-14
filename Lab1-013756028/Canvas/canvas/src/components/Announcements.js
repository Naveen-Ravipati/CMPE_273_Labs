import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router';

class Announcements extends Component {
    constructor() {
        super();
        this.state = {
            announcements: [],
            temp: '',
            date: '',
            announce: '',
            visibility:'visible'
        }

    }

    date_ChangeHandler = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    announce_ChangeHandler = (e) => {
        this.setState({
            announce: e.target.value
        })
    }

    componentDidMount = async () => {
        if(localStorage.getItem('student_or_faculty') == 'student'){
            await this.setState({
                visibility:'hidden'
            })
        }
        axios.post('http://localhost:3001/announcements')
            .then((response) => {
                //update the state with the response data
                if (this.state.announcements == '') {
                    this.setState({
                        announcements: this.state.announcements.concat(response.data)
                    });
                }
                console.log('here :' + this.state.announcements[0].Date)
            });
    }

    submit_announce = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            course_id: localStorage.getItem('course_id'),
            date: this.state.date,
            announce: this.state.announce,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/submit_announce', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log('Success')
                }
                else {
                    console.log('Failure')
                }
            });
        alert('Announcement Submitted')
    }


    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        //iterate over books to create a table row
        let details = this.state.announcements.map(announcement => {
            if (announcement.course_id == localStorage.getItem('course_id')) {
                return (
                    <tr>
                        <td>{announcement.Date}</td>
                        <td>{announcement.course_id}</td>
                        <td>{announcement.Announce}</td>
                    </tr>
                )
            }
        })
        //if not logged in go to login page

        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Announcements</h2>
                    <button class='btn btn-primary' type='button' data-toggle="modal" data-target="#myModal" style={{ marginLeft: '70%', marginBottom: '2%', visibility: this.state.visibility }}><span class='fas fa-plus-circle'></span>Create New Announcement</button>
                    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div style={{ backgroundColor: 'yellow' }} class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Announcement</h4>
                                </div>
                                <div class="modal-body">
                                    <div style={{ marginBottom: '5%' }}>
                                        <input onChange={this.date_ChangeHandler} type='date' required='required' placeholder='Date'></input>
                                    </div>
                                    <div style={{ marginBottom: '5%' }}>
                                        <input onChange={this.announce_ChangeHandler} type='text' required='required' placeholder='Announce'></input>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <center>
                                        <button onClick={this.submit_announce} class="btn btn-default" data-dismiss="modal">Announce</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Course ID</th>
                                <th>Announcement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
//export Announcements Component
export default Announcements;