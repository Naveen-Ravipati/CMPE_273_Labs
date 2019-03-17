import React, { Component } from 'react';
import axios from 'axios';

class People extends Component {
    constructor(props){
        super(props);
        this.state = {  
            people : [],
        }
    }

    componentDidMount=()=>{

        axios.post('http://localhost:3001/people')
                .then((response) => {
                //update the state with the response data
                if(this.state.people == ''){
                    this.setState({
                    people : this.state.people.concat(response.data) 
                    });
                }
                alert('here :'+this.state.people[0])
            });
    }


    render(){
        //iterate over books to create a table row
        let details = this.state.people.map(student => {
            if(student.course_Id == localStorage.getItem('course_id')){
            return(
                <tr>
                    <td>{student.student_id}</td>
                    <td>{student.name}</td>
                    <td>Student</td>
                </tr>
            )}
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