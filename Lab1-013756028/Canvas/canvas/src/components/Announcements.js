import React, { Component } from 'react';
import axios from 'axios';

class Announcements extends Component {
    constructor(){
        super();
        this.state = {  
            announcements : []
        }
    }

    componentDidMount=()=>{
        axios.post('http://localhost:3001/announcements')
                .then((response) => {
                //update the state with the response data
                if(this.state.announcements == ''){
                    this.setState({
                    announcements : this.state.announcements.concat(response.data) 
                    });
                }
                console.log('here :'+this.state.announcements[0].Date)
            });
    }


    render(){
        //iterate over books to create a table row
        let details = this.state.announcements.map(announcement => {
            if(announcement.course_id == localStorage.getItem('course_id')){
            return(
                <tr>
                    <td>{announcement.course_id}</td>
                    <td>{announcement.Date}</td>
                    <td>{announcement.Announce}</td>
                </tr>
            )}
        })
        //if not logged in go to login page

        return(
            <div>
                <div class="container">
                    <h2>Announcements</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Date</th>
                                    <th>Announcement</th>
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
export default Announcements;