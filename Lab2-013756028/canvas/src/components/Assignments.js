import React, { Component } from 'react'
import axios from 'axios';
import '../styles/Assignments.css'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

export default class Assignments extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      assignments: [],
      detect: "",
      assignment_name: "",
      assignment_due: "",
      assignment_marks: "",
      assignment_update: "initial"
    }
    if (localStorage.getItem('student_or_faculty') == "student") {
      this.state.detect = "hidden"
    }
  }
  assignment_name_change_handler = (e) => {
    this.setState({
      assignment_name: e.target.value
    })
  }
  assignment_due_change_handler = (e) => {
    this.setState({
      assignment_due: e.target.value
    })
  }
  assignment_marks_change_handler = (e) => {
    this.setState({
      assignment_marks: e.target.value
    })
  }
  componentDidMount=async()=> {
    const data = {
      course_id: localStorage.getItem('course_id')
    }
    axios.defaults.withCredentials = true;

    await axios.post('http://localhost:3001/get_assignment', data)
      .then((response) => {
        if (response.status === 200) {

          console.log("success")
          console.log(response.data)

          //update the state with the response data
          this.setState({
            assignments: response.data
          });
        }
      });
      console.log(this.state.assignments)
  }
  
  change = (val) => (e) => {

    localStorage.setItem('assignment_id', val.assignment_id)

    this.props.callbackfromparent();
  }
  assignment_update = (e) => {
    const data = {
      course_id: localStorage.getItem('course_id'),
      assignment_name: this.state.assignment_name,
      assignment_due: this.state.assignment_due,
      assignment_marks: this.state.assignment_marks
    }
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/create_assignment', data)
      .then((response) => {
        if (response.status === 200) {

          alert("Assignment Updated")
          console.log(this.state.assignment_update)
          this.setState({
            assignment_update: "updated"
          })
        }
      });
  }

  render() {


    if (this.state.assignments) {
      var assignmentslist = this.state.assignments.map(assignment => {
        return (
          <tr>
            <td onClick={this.change(assignment)} className='col-md-5'>{assignment.name}</td>
            <td className='col-md-5'>{assignment.due}</td>
          </tr>
        )
      })
    }

    return (
      <div>
        <div>
          <input type="text" placeholder="Search"></input>
          <button class="btn btn-primary mr-auto" data-toggle="modal" data-target="#myModal" onClick={this.createassignment} style={{ visibility: this.state.detect, float: "right", marginLeft: "200px" }}><i class="fal fa-plus"></i>Assignments</button>
        </div>
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog" style={{ width: "30%" }}>
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <center> <h4 class="modal-title">Create Assignment</h4></center>
                <div class="lessspace"></div>
              </div>
              <div class="modal-body">
                <center>
                  <form style={{ width: "1-0%" }}>
                    <div class="row">
                      <div class=" form-group col col-sm-5" >
                        Assignment Name
               </div>
                      <div class="col col-sm-7">
                        <input onChange={this.assignment_name_change_handler} type="text" name="assignment_name" class="form-control" placeholder="Assignment Name"></input>
                      </div>
                    </div>
                    <div class="lessspace"></div>
                    <div class="row">
                      <div class=" form-group col col-sm-5" >
                        Assignment Due
               </div>
                      <div class="col col-sm-7">
                        <input onChange={this.assignment_due_change_handler} type="date" name="assignment_due" class="form-control" placeholder="Assignment Due"></input>
                      </div>
                    </div>
                    <div class="lessspace"></div>
                    <div>
                      <div class=" form-group col col-sm-5" >
                        Assignment Marks
               </div>
                      <div class="col col-sm-7">
                        <input onChange={this.assignment_marks_change_handler} type="number" name="assignment_marks" class="form-control"></input>
                      </div>
                    </div>
                    <div class="space"></div>

                    <div class="form-group" style={{ width: "40%" }}>
                      <button onClick={this.assignment_update} type="submit" class="btn btn-primary btn-block">Update</button>
                    </div>
                  </form>
                </center>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
        <div>
          <div><h2>Assignments</h2></div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {assignmentslist}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}
