import React, { Component } from 'react';
import axios from 'axios';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            prev_count: 0,
            next_count: 2,
        }
    }

    new_function = () => {
        const data = {
            course_id: localStorage.getItem('course_id')
        }
        var token = localStorage.getItem("token");
        axios.post('http://localhost:3001/people', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    people: response.data
                })
                console.log(this.state.people)
            });
    }

    drop_course = async (val) => {
        const data = {
            course_id: localStorage.getItem('course_id'),
            student_id: val.student_id
        }
        console.log(data.student_id)
        var token = localStorage.getItem("token");
        await axios.post('http://localhost:3001/drop_course', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                if (response.status == 200) {
                    alert('Course Dropped')
                }
            });

        this.new_function()
    }


    componentDidMount = async () => {
        // alert('here')
        const data = {
            course_id: localStorage.getItem('course_id')
        }
        var token = localStorage.getItem("token");
        await axios.post('http://localhost:3001/people', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    people: response.data
                })
                console.log(this.state.people)
            });
    }

    next_page = (e) => {
        if (this.state.next_count < this.state.people.length) {
            this.setState({
                next_count: this.state.next_count + 2,
                prev_count: this.state.prev_count + 2
            })
        }
        if (this.state.next_count >= this.state.people.length) {

            alert("No more content")
        }
    }

    previous_page = (e) => {
        if (this.state.prev_count > 1) {
            this.setState({
                next_count: this.state.next_count - 2,
                prev_count: this.state.prev_count - 2
            })
        }
        if (this.state.prev_count <= 0) {
            alert("No previous content")
        }
    }


    render() {
        //iterate over books to create a table row
        if(this.state.people.length>0){
        let visibility = ''
        let student_or_faculty = localStorage.getItem('student_or_faculty')
        if (student_or_faculty == 'student') {
            visibility = 'hidden'
        }
        else {
            visibility = 'visible'
        }
        var details = this.state.people.map((student,idx) => {
            if(idx>=this.state.prev_count && idx<this.state.next_count){
            return (
                <tr>
                    <td>{student.student_id}</td>
                    <td>{student.name}</td>
                    <td>Student</td>
                    <td style={{ visibility: visibility }}><button onClick={this.drop_course.bind(this, student)}>Drop</button></td>
                </tr>
            )
            }
        })
    }

        return (
            <div>
                <div class="container">
                    <h2>People</h2>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                            <button onClick={this.previous_page} class="btn btn-primary" type="button" style={{ marginLeft: "100px" }}>Previous</button>
                            <button onClick={this.next_page} class="btn btn-primary" type="button" style={{ marginLeft: "350px" }}>Next</button>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
//export Announcements Component
export default People;