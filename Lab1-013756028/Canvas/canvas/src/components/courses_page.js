import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Announcements from './Announcements';
import Test1 from './Test1';
import '../styles/courses_page.css'


//Define a Login Component
class courses_page extends Component{
    //call the constructor method
    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        this.state= {
            subjects: 3,
            temp: ""
        }

    }

    progress = (e) =>{
        console.log(e)
        this.setState({
            temp : e
        });
    }

    render(){
        return(
        <div className = 'col-md-11'>    
            <div className = 'col-md-12' >
                <h2>{localStorage.getItem('course_id')}</h2>
            </div>
            <div className = 'col-md-1' style={{marginLeft:'-5%', }}>
                <ul>
                    <div class = 'course_page_side_tab'><a href = '#'>Home</a></div>
                    <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <Announcements/>)}>Announcements</a></div>
                    {/* <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <Assignments/>)}>Assignments</a></div> */}
                    <div class = 'course_page_side_tab'><a href = '#'>Discussions</a></div>
                    {/* <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <Grades/>)}>Grades</a></div> */}
                    {/* <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <People/>)}>People</a></div> */}
                    {/* <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <Files/>)}>Files</a></div> */}
                    <div class = 'course_page_side_tab'><a href = '#'>Syllabus</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Modules</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Conferences</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Collaborations</a></div>                
                    <div class = 'course_page_side_tab'><a href = '#'>Chat</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Criterion</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Portfolium</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>SOTe/SOLATE</a></div>
                </ul>
            </div>
            <div className = 'col-md-11'>
                <div>{this.state.temp}</div>
            </div>
        </div>
        )
    }
}
//export Login Component
export default courses_page;