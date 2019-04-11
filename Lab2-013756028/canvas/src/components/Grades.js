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
            faculty_id: ''
        }
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
        await axios.post('http://localhost:3001/grades', data,{
            headers: {"Authorization" : `Bearer ${token}`}})
            .then((response) => {
                //update the state with the response data
                    this.setState({
                        grades: response.data[0].grades
                    });
                console.log(this.state.grades)
            });
    }


    render() {
        //iterate over books to create a table row
        let details = this.state.grades.map(grade => {
            if (this.state.student_or_faculty == 'student') {
                if(this.state.student_id == grade.student_id){
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
            //if not logged in go to login page
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
                )}

            else  {
                return (
                    <div>
                        <div class="container">
                            <h2>Grades</h2>
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
                )}
            
        }  
}

    //export Announcements Component
    export default Grades;