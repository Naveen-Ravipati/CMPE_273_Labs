import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../styles/dashboard.css'

//Define a Login Component
class dashboard extends Component{
    //call the constructor method
    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        this.state= {
            courses: []
        }

    }

    componentDidMount=()=>{
        axios.post('http://localhost:3001/courses')
                .then((response) => {
                //update the state with the response data
                if(this.state.courses == ''){
                    this.setState({
                        courses : this.state.courses.concat(response.data) 
                    });
                }
                console.log('here :'+this.state.courses)
            });
    }

    render(){
        let courses = this.state.courses.map(course => {
            return(  
                    <div class = 'col-md-3'>
                                <div class = 'empty_tile' style = {{backgroundColor:course.course_color}}></div>
                                <div class = 'empty_tile1'>     
                                    <a onClick= {store_local=>{localStorage.setItem('courseID',course.course_id)}}
                                    href='./courses_page'><h4>{course.course_id}</h4></a>
                                    <br></br>
                                    <br></br>
                                    <span class = 'fa fa-bullhorn fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class = 'fa fa-university fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class = 'fa fa-comment fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class = 'fa fa-folder fa-2x'></span>
                                    
                                </div>
                    </div>
                )
        })

        return(
        <div>    
            <div>
                <div class = 'col-md-11'><h2>Dashboard</h2></div>
            </div>
            
            <div>{courses}</div>
        </div>
        )
    }
}
//export Login Component
export default dashboard;