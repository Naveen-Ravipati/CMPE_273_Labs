import React, { Component } from 'react';
import axios from 'axios';

class People extends Component {
    constructor(props){
        super(props);
        this.state = {  
            people : [],
        }
    }

    new_function = ()=>{
        const data = {
            course_id: localStorage.getItem('course_id')
        }
        var token = localStorage.getItem("token");
        axios.post('http://localhost:3001/people',data,{
            headers: {"Authorization" : `Bearer ${token}`}})
                .then((response) => {
                //update the state with the response data
                    this.setState({
                    people : response.data
                    })
                console.log(this.state.people)
            });
    }

    drop_course = async(val)=>{
        const data = {
            course_id:localStorage.getItem('course_id'),
            student_id:val.student_id
        }
        console.log(data.student_id)
        var token = localStorage.getItem("token");
        await axios.post('http://localhost:3001/drop_course',data,{
            headers: {"Authorization" : `Bearer ${token}`}})
        .then((response) => {
        if(response.status == 200){
            alert('Course Dropped')
        }
    });
    
    this.new_function()
    }


    componentDidMount=async()=>{
        alert('here')
        const data = {
            course_id: localStorage.getItem('course_id')
        }
        var token = localStorage.getItem("token");
        await axios.post('http://localhost:3001/people',data,{
            headers: {"Authorization" : `Bearer ${token}`}})
                .then((response) => {
                //update the state with the response data
                    this.setState({
                    people : response.data
                    })
                console.log(this.state.people)
            });
    }


    render(){
        //iterate over books to create a table row
        let visibility = ''
        let student_or_faculty = localStorage.getItem('student_or_faculty')
        if(student_or_faculty == 'student'){
            visibility = 'hidden' 
        }
        else{
            visibility = 'visible'
        }
        let details = this.state.people.map(student => {
            return(
                <tr>
                    <td>{student.student_id}</td>
                    <td>{student.name}</td>
                    <td>Student</td>
                    <td  style = {{visibility:visibility}}><button onClick= {this.drop_course.bind(this,student)}>Drop</button></td>
                </tr>
            )
        })
        //if not logged in go to login page

        return(
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
                        </tbody>
                    </table>
                </div> 
            </div> 
        )
    }

}
//export Announcements Component
export default People;