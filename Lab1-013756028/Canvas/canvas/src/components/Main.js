import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Navbar from './LandingPage/Navbar';
import dashboard from './dashboard';
import courses_page from './courses_page';
import Test1 from './Test1';
import Announcements from './Announcements';
import course_register from './course_register'
import edit_profile from './edit_profile'
import profile_update from './profile_update';

//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/" component={Navbar}/> */}
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={dashboard}/>
                <Route path="/edit_profile" component={edit_profile}/>
                <Route path="/profile_update" component={profile_update}/>
                <Route path="/courses_page" component={courses_page}/>
                <Route path="/Test1" component={Test1}/>
                <Route path="/course_register" component={course_register}/>             
            </div>
        )
    }
}
//Export The Main Component
export default Main;