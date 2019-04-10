import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../styles/dashboard.css'
import Navbar from '../components/LandingPage/Navbar';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';

//Define a Login Component
class dashboard extends Component {
    //call the constructor method
    constructor() {
        //Call the constrictor of Super class i.e The Component
        super();
        this.state = {
            courses: [],
            student_id: '',
            faculty_id: '',
            student_or_faculty: '',
            status:""
        }

    }

    componentDidMount = async () => {
        // alert('dashboard')
        // alert(this.props.redirectVar)
        if (this.props.redirectVar == false) {
            // alert('here')
        this.setState({
            redirectVar:<Redirect to='/' />
        }) 
        }

        if (localStorage.getItem('student_or_faculty') == 'student') {
            await this.setState({
                student_id: localStorage.getItem('student_id'),
                student_or_faculty: 'student'
            });
        }
        else {
            await this.setState({
                faculty_id: localStorage.getItem('faculty_id'),
                student_or_faculty: 'faculty'
            });
        }

        const data = {
            student_id: this.state.student_id,
            faculty_id: this.state.faculty_id,
            student_or_faculty: localStorage.getItem('student_or_faculty')
        }
        console.log('Dashboard faculty ID' + this.state.faculty_id)
        await axios.post('http://localhost:3001/dashboard_courses', data)
            .then((response) => {
                //update the state with the response data
                // if (this.state.courses == '') {
                //     this.setState({
                //         courses: this.state.courses.concat(response.data)
                //     });
                // }
                console.log(response.data)
                    this.setState({
                        courses: response.data
                    });
                console.log(this.state.courses)
            });
    }

    allowDrop=(ev)=> {
        ev.preventDefault();
      }
      
    drag=(ev) => {
        ev.dataTransfer.setData ("src", ev.target.id);
      }
      
    drop=(val,ev)=> {
        ev.preventDefault ();
        console.log(val)
        var idx1 = ev.dataTransfer.getData ("src");
        var idx2 = ev.target.id
        console.log(idx2)

        var temp
        temp = this.state.courses[idx1]
        this.state.courses[idx1] = this.state.courses[val]

        this.state.courses[val]  = temp
        console.log("courses",this.state.courses)
        this.setState({
            status:"updated"
        })
      }

    render() {
        //if not logged in go to login page
        // let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }

        let courses = this.state.courses.map((course,idx) => {
                return (
                    <div id = {idx}   onDrop={this.drop.bind(this,idx)} onDragOver={this.allowDrop} draggable="true" onDragStart={this.drag} class='col-md-3' >
                        <div class='empty_tile' style={{ backgroundColor: course.course_color }}></div>
                        <div class='empty_tile1'>
                            <a onClick={store_local => { localStorage.setItem('course_id', course.course_id) }}
                                href='./courses_page'><h4>{course.course_name}</h4></a>
                            <br></br>
                            <span class='fa fa-bullhorn fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class='fa fa-university fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class='fa fa-comment fa-2x'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class='fa fa-folder fa-2x'></span>

                        </div>
                    </div>
                )
        })

        return (

            <div>
            {this.state.redirectVar}
                <Navbar />
                <div>
                    <div class='col-md-11'><h2>Dashboard</h2></div>
                </div>

                <div>{courses}</div>
            </div>
        )
    }
}



//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    redirectVar: state.loginState.redirectVar,
    response: state.loginState.response
    // ...state.loginState

})

export default connect(mapStateToProps)(dashboard);
// export default dashboard;