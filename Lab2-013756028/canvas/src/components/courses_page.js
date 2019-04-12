import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Announcements from './Announcements';
import '../styles/courses_page.css'
import Navbar from './LandingPage/Navbar';
import Quiz from './Quiz'
import Quiz_questions from './Quiz_questions'
import People from './People'
import Grades from './Grades'
import Assignments from './Assignments'
import Assignment_details from './Assignment_details';


//Define a Login Component
class courses_page extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state= {
            subjects: 3,
            temp:''
        }
    }

    progress = (e) =>{
        this.setState({
            temp : e
        });
    }

    mycallback = (e) =>{
        console.log(e)
        this.setState({
            temp : e
        });
    }

    render(){
        return(
        <div>
        <Navbar/> 
        <div className = 'col-md-11'>    
            <div className = 'col-md-12' >
                <h2>{localStorage.getItem('course_id')}</h2>
            </div>
            <div className = 'col-md-1' style={{marginLeft:'-5%', }}>
                <ul>
                    <div class = 'course_page_side_tab'><a href = '#'>Home</a></div>
                    <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <Announcements/>)}>Announcements</a></div>
                    <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <Assignments callbackfromparent = {this.mycallback.bind(this,<Assignment_details/>)}/>)}>Assignment</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Discussions</a></div>
                    <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <Grades/>)}>Grades</a></div>
                    <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <People/>)}>People</a></div>
                    {/* <div class = 'course_page_side_tab'><a onClick={this.progress.bind(this, <Files/>)}>Files</a></div> */}
                    <div class = 'course_page_side_tab'><a href = '#'>Syllabus</a></div>
                    <div class = 'course_page_side_tab'><a onClick = {this.progress.bind(this,<Quiz callbackfromparent = {this.mycallback.bind(this,<Quiz_questions/>)}/>)}>Quizzes</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Modules</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Conferences</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Collaborations</a></div>                
                    <div class = 'course_page_side_tab'><a href = '#'>Chat</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Criterion</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>Portfolium</a></div>
                    <div class = 'course_page_side_tab'><a href = '#'>SOTe/SOLATE</a></div>
                </ul>
            </div>
            <div className = 'col-md-10 col-md-offset-1'>
                <div>{this.state.temp}</div>
            </div>
        </div>
        </div> 
        )
    }
}
//export Login Component
export default courses_page;