import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../styles/course_register.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'



//Define a Login Component
class course_register extends Component{
    //call the constructor method
    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        this.state= {
            course_term: 'Fall',
            course_name: '',
            course_id: '',
            search_condition:'greater',
            searched_courses:[]

        }

    }

    course_term_ChangeHandler = (e) => {
        this.setState({
            course_term : e.target.value
        })
    }

    course_name_ChangeHandler = (e) => {
        this.setState({
            course_name : e.target.value
        })
    }

    course_id_ChangeHandler = (e) => {
        this.setState({
            course_id : e.target.value
        })
    }

    search_condition_ChangeHandler = (e) => {
        this.setState({
            search_condition : e.target.value
        })
    }

    search_class = (event)=>{
        var data = 
        {
            'course_term': this.state.course_term,
            'course_name': this.state.course_name,
            'course_id': this.state.course_id,
            'search_condition': this.state.search_condition
        }
        axios.post('http://localhost:3001/search/',data)
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        searched_courses: response.data
                    });
                }
            });
    }

    render(){

        let searched_courses = this.state.searched_courses.map(course => {
            return(
                <tr>
                    <td>{course.course_id}</td>
                    <td>{course.course_description}</td>
                    <td>{course.course_room}</td>
                    <td>{course.course_term}</td>
                </tr>
            )
        })

        return(
        <div className= 'col-md-11'>
            <center>
                <div class = 'course_register'>
                    <h4>Institution - San Jose State University </h4>
                    <select onChange = {this.course_term_ChangeHandler}>
                        <option class = 'active' value = 'Fall'>Fall</option>
                        <option value = 'Spring'> Spring</option>
                    </select>
                </div>
            </center>
                <div style = {{marginLeft:'35%', marginBottom:'1%'}}>
                    <div style = {{marginBottom:'1%'}}>
                        <label for='course_name'>  Course Name</label>
                        <input onChange={this.course_name_ChangeHandler} type = 'text' id ='course_name'></input>
                    </div>
                    <div >
                        <label for='course_id'>  Course ID</label>
                        <select onChange={this.search_condition_ChangeHandler} id = 'course_id' style = {{marginRight: '5%'}}>
                            <option class = 'active' value = 'greater'>is greater than</option>
                            <option value = 'exactly'>is exactly</option>
                            <option value = 'lesser'>is less than</option>
                        </select>
                        <input onChange={this.course_id_ChangeHandler} type = 'number' id = 'id'></input>
                    </div>

                </div>

                <center>
                    <div>
                        <button onClick={this.search_class} type = 'submit'><i class= 'fa fa-search'></i>Search</button>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {searched_courses}
                                </tbody>
                            </table>
                    </div> 
                </div>
        </div>
        )
        }
    }

//export Login Component
export default course_register;