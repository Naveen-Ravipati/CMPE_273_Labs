import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../styles/dashboard.css'

//Define a Login Component
class profile extends Component {
    //call the constructor method
    constructor() {
        //Call the constrictor of Super class i.e The Component
        super();
        this.state = {
            subjects: 3
        }

    }

    render() {
        return (
            <div className='col-md-10' style = {{marginTop: '2%'}}>
                <div class='container'>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="username">Name</label>
                                <input class="form-control" id="username" placeholder="Student name" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="company">Company</label>
                                <input type="text" class="form-control" id="company" placeholder="Company" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="school">School</label>
                                <input type="text" class="form-control" id="school" placeholder="School" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="languages">Languages</label>
                                <input type="text" class="form-control" id="languages" placeholder="Languages Known" />
                            </div>
                            <div class="form-group col-md-6" style = {{padding:'20px'}}>
                                <label for="Gender">Gender</label>&nbsp;
                                <select name='cars'>
                                    <option id ='Gender' value="Male">Male</option>
                                    <option id ='Gender' value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="Mobile">Mobile</label>
                                <input type="number" class="form-control" id="Mobile" placeholder="Mobile" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Phone Number">Phone Number</label>
                                <input type="number" class="form-control" id="Phone Number" placeholder="Phone Number" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="City">City</label>
                                <input type="text" class="form-control" id="City" placeholder="city" />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="Hometown">Hometown</label>
                                <input type="text" class="form-control" id="Hometown" placeholder="Hometown" />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="country">country</label>
                                <input type="text" class="form-control" id="country" placeholder="country" />
                            </div>
                        </div>
                        <div class="form-row">
                            <label for = 'input_text_area'>About Me</label>
                            <textarea class = 'form-control' id = 'input_text_area' rows = '4'></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group" >
                                <center>
                                <br></br>
                                <button class = 'btn btn-primary'  type = 'submit'>Update</button>
                                </center>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )

    }
}

export default profile;