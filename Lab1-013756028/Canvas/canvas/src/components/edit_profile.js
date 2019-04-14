import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './LandingPage/Navbar';

class edit_profile extends Component {
  constructor() {
    super()
    this.state= {
      student_or_faculty:'',
      student_id:'',
      faculty_id:'',
  } 

  }

  componentDidMount = async(e) => {
    await this.setState(
      {
      student_or_faculty: localStorage.getItem('student_or_faculty'),
      student_id: localStorage.getItem('student_id'),
      faculty_id: localStorage.getItem('faculty_id')
      })
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/edit_profile',this.state)
    .then(response => {
      console.log("Edit profile Data : ", response.data);
      this.setState({
        ...response.data[0]
      })

    });
  }

  render() {

    return (
    <div>
        <Navbar/>

      <div>
        <div className="col-md-10">
          <h2>User Profile Page</h2>
          <span class="fa fa-user-circle fa fa-2x"></span>
          <a style = {{marginLeft:'70%'}} href = 'profile_update'><button class=" fa fa-edit btn btn-info btn-lg" > Edit Profile</button></a>
        </div>
      </div>
      <div className='col-md-10' style = {{marginTop: '2%'}}>
                <div class='container'>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="username">Name</label>
                                <input onChange = {this.ChangeHandler} class="form-control" name = 'name' id="username" value = {this.state.name}  placeholder="Name" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputEmail">Email</label>
                                <input onChange = {this.ChangeHandler} type="email" name = 'email' class="form-control" id="inputEmail" value = {this.state.email} placeholder="Email" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="company">Company</label>
                                <input onChange = {this.ChangeHandler} type="text" name = 'company' class="form-control" id="company" value = {this.state.company} placeholder="Company" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="school">School</label>
                                <input onChange = {this.ChangeHandler} type="text" name = 'school' class="form-control" id="school" value = {this.state.school} placeholder="School" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="languages">Languages</label>
                                <input onChange = {this.ChangeHandler} type="text" name = 'languages' class="form-control" id="languages"  value = {this.state.languages} placeholder="Languages Known" />
                            </div>
                            <div class="form-group col-md-6" style = {{padding:'20px'}}>
                                <label for="Gender">Gender</label>&nbsp;
                                <select onChange = {this.ChangeHandler} value ={this.state.gender} name='gender'>
                                    <option id ='Gender' value="Male">Male</option>
                                    <option id ='Gender' value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="Mobile">Mobile</label>
                                <input onChange = {this.ChangeHandler} name = 'mobile_number' type="number" class="form-control" id="Mobile"  value= {this.state.mobile} placeholder="Mobile" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Phone Number">Phone Number</label>
                                <input onChange = {this.ChangeHandler} type="number" name = 'phone_number' class="form-control" id="Phone Number"  value = {this.state.phone_number} placeholder="Phone Number" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="City">City</label>
                                <input onChange = {this.ChangeHandler}  name = 'city' type="text" class="form-control" id="City"  value = {this.state.city} placeholder="city" />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="Hometown">Hometown</label>
                                <input onChange = {this.ChangeHandler} type="text" name = 'hometown' class="form-control" id="Hometown"  value ={this.state.hometown} placeholder="Hometown" />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="country">country</label>
                                <input onChange = {this.ChangeHandler} type="text" name = 'country' class="form-control" id="country"  value = {this.state.country} placeholder="country" />
                            </div>
                        </div>
                        <div class="form-row">
                            <label for = 'input_text_area'>About Me</label>
                            <textarea onChange = {this.ChangeHandler} name = 'about_me' class = 'form-control' id = 'input_text_area'  value = {this.state.about_me} rows = '4'></textarea>
                        </div>

                    </form>
                </div>
            </div>
    </div>
    )
  }
}

export default edit_profile;
