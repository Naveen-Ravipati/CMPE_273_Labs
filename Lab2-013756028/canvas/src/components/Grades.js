import React, { Component } from 'react';
import axios from 'axios';

class Grades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [],
            student_or_faculty: '',
            course_id: '',
            student_id: '',
            faculty_id: '',
            people: [],
            assignments: [],
            selected_assignment: '200_hw_1',
            marks_eneterd: 0,
            assignment_data: []
        }
    }

    marks_changehandler = (e) => {
        this.setState({
            marks_entered: e.target.value
        })
    }

    assignment_handler = (e) => {
        this.setState({
            selected_assignment: e.target.value
        })
    }

    add_marks = (val1, val2, val3) => {
        const data = {
            student_id: val1,
            marks: val2,
            assignment_id: val3
        }
        this.state.assignment_data.push(data)
        console.log(this.state.assignment_data)
    }

    assignment_marks_submit = async () => {
        const assignment_data = {
            course_id: localStorage.getItem('course_id'),
            assignment_data: this.state.assignment_data
        }
        await axios.post('http://localhost:3001/assignment_marks_submit', assignment_data)
            .then((response) => {
                //update the state with the response data
                if (response.status == 200) {
                    console.log('Success in entering assignment marks')
                }
                else {
                    console.log('Error in entering assignment marks')
                }
            });
        window.location.reload();
    }

    componentDidMount = async () => {
        await this.setState({
            student_or_faculty: localStorage.getItem('student_or_faculty'),
            student_id: localStorage.getItem('student_id'),
            faculty_id: localStorage.getItem('faculty_id'),
            course_id: localStorage.getItem('course_id')
        })

        const data = {
            ...this.state
        }
        var token = localStorage.getItem("token");
        await axios.post('http://localhost:3001/grades', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    grades: response.data[0].grades
                });
                console.log(this.state.grades)
            });

        const data_people = {
            course_id: localStorage.getItem('course_id')
        }
        await axios.post('http://localhost:3001/people', data_people, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    people: response.data
                })
                console.log(this.state.people)
            });

        const data_assignment = {
            course_id: localStorage.getItem('course_id')
        }
        axios.defaults.withCredentials = true;

        await axios.post('http://localhost:3001/get_assignment', data_assignment)
            .then((response) => {
                if (response.status === 200) {

                    console.log("success")
                    console.log(response.data)

                    //update the state with the response data
                    this.setState({
                        assignments: response.data
                    });
                }
            });
    }



    render() {
        let students_list = this.state.people.map(student => {
            return (
                <div>
                    <div class='col col-sm-12' style={{ marginBottom: '2%' }}>
                        <div class='col col-sm-3'>{student.name}</div>
                        <div class='col col-sm-2'></div>
                        <input onChange={this.marks_changehandler} class='col col-sm-3' type='number' placeholder='Enter marks'></input>
                        <div class='col col-sm-1'></div>
                        <button onClick={this.add_marks.bind(this, student.student_id, this.state.marks_entered, this.state.selected_assignment)} class='col col-sm-3'>Add marks</button>
                    </div>
                </div>
            )
        })

        let assignment_list = this.state.assignments.map(assignment => {
            return (

                <option value={assignment.name}>{assignment.name}</option>
            )
        })


        let details = this.state.grades.map(grade => {
            if (this.state.student_or_faculty == 'student') {
                if (this.state.student_id == grade.student_id) {
                    return (
                        <tr>
                            <td>{grade.quiz_id}</td>
                            <td>{grade.marks}</td>
                        </tr>
                    )
                }
            }
            else if (this.state.student_or_faculty == 'faculty') {
                return (
                    <tr>
                        <td>{grade.student_id}</td>
                        <td>{grade.quiz_id}</td>
                        <td>{grade.marks}</td>
                    </tr>
                )
            }
        })

        if (this.state.student_or_faculty == 'student') {
            return (
                <div>
                    <div class="container">
                        <h2>Grades</h2>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Assignment ID</th>
                                    <th>Marks</th>
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

        else {
            return (
                <div>
                    <div class="container">
                        <h2>Grades</h2>
                        <button style={{ marginLeft: '30%' }} className='btn btn-primary' type='button' data-toggle="modal" data-target="#myModal">Grade student's Assignments</button>
                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div style={{ backgroundColor: '#337AB7' }} class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 style={{ color: 'black' }} class="modal-title">Enter grades for Assignments</h4>
                                    </div>
                                    <div class="modal-body">
                                        <center>
                                            <select onChange={this.assignment_handler} >{assignment_list}</select>
                                        </center>
                                        <br></br>
                                        {students_list}
                                    </div>
                                    <div class="modal-footer">
                                        <center>
                                            <button onClick={this.assignment_marks_submit} class="btn btn-default" data-dismiss="modal">Submit</button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Assignment ID</th>
                                    <th>Marks</th>
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
}

//export Announcements Component
export default Grades;