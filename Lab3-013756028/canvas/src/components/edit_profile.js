import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './LandingPage/Navbar';

/* REDUX IMPORTS BEGIN */
import { connect } from 'react-redux';
import { Profile_fetch } from '../actions/profile_actions';
import { stat } from 'fs';
/* REDUX IMPORTS END */

/* GRAPHQL IMPORTS BEGIN */
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { validate_edit_profile } from '../queries/edit_profile';
/* GRAPHQL IMPORTS END */

class edit_profile extends Component {
    constructor() {
        super()
        this.state= {
          student_or_faculty:'',
          student_id:'',
          faculty_id:'',
          email:'',
          name:'',
          about_me:'',
          city:'',
          country:'',
          gender:'',
          hometown:'',
          languages:'',
          mobile:'',
          phone_number:'',
          school:''
          } 
    }

    componentDidMount = async(e) => {
        // await this.setState(
        //   {
        //   student_or_faculty: localStorage.getItem('student_or_faculty'),
        //   student_id: localStorage.getItem('student_id'),
        //   faculty_id: localStorage.getItem('faculty_id')
        //   })
        // e.preventDefault();
        // axios.defaults.withCredentials = true;


            await this.props.client.query({
                query: validate_edit_profile,
                variables: {
                    login_id: localStorage.getItem('login_id'),
                    student_or_faculty: localStorage.getItem('student_or_faculty')
                }
            }).then(async(response) => {
                console.log(response.data.edit_profile);
                if (response.data.edit_profile.status == 200) {
                    await this.setState({
                        email:response.data.edit_profile.user_data.email,
                        name:response.data.edit_profile.user_data.name,
                        about_me:response.data.edit_profile.user_data.about_me,
                        city:response.data.edit_profile.user_data.city,
                        country:response.data.edit_profile.user_data.country,
                        gender:response.data.edit_profile.user_data.gender,
                        hometown:response.data.edit_profile.user_data.hometown,
                        languages:response.data.edit_profile.user_data.languages,
                        mobile:response.data.edit_profile.user_data.mobile,
                        phone_number:response.data.edit_profile.user_data.phone_number,
                        school:response.data.edit_profile.user_data.school,
                    })
                }
                console.log(response.data.edit_profile.user_data.email)
                console.log(this.state.email)
            });
    }



    render() {

        return (
            <div>
                <Navbar />

                <div>
                    <div className="col-md-10">
                        <h2>User Profile Page</h2>
                        <span class="fa fa-user-circle fa fa-2x"></span>
                        <a style={{ marginLeft: '70%' }} href='profile_update'><button class=" fa fa-edit btn btn-info btn-lg" > Edit Profile</button></a>
                    </div>
                </div>
                <div className='col-md-10' style={{ marginTop: '2%' }}>
                    <div class='container'>
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6"> 
                                    <label for="username">Name</label>
                                    <input onChange={this.ChangeHandler} class="form-control" name='name' id="username" value={this.state.name} placeholder="Name" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputEmail">Email</label>
                                    <input onChange={this.ChangeHandler} type="email" name='email' class="form-control" id="inputEmail" value={this.state.email} placeholder="Email" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="company">Company</label>
                                    <input onChange={this.ChangeHandler} type="text" name='company' class="form-control" id="company" value={this.props.company} placeholder="Company" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="school">School</label>
                                    <input onChange={this.ChangeHandler} type="text" name='school' class="form-control" id="school" value={this.state.school} placeholder="School" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="languages">Languages</label>
                                    <input onChange={this.ChangeHandler} type="text" name='languages' class="form-control" id="languages" value={this.state.languages} placeholder="Languages Known" />
                                </div>
                                <div class="form-group col-md-6" style={{ padding: '20px' }}>
                                    <label for="Gender">Gender</label>&nbsp;
                                <select onChange={this.ChangeHandler} value={this.state.gender} name='gender'>
                                        <option id='Gender' value="Male">Male</option>
                                        <option id='Gender' value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="Mobile">Mobile</label>
                                    <input onChange={this.ChangeHandler} name='mobile_number' type="number" class="form-control" id="Mobile" value={this.state.mobile} placeholder="Mobile" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Phone Number">Phone Number</label>
                                    <input onChange={this.ChangeHandler} type="number" name='phone_number' class="form-control" id="Phone Number" value={this.state.phone_number} placeholder="Phone Number" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="City">City</label>
                                    <input onChange={this.ChangeHandler} name='city' type="text" class="form-control" id="City" value={this.state.city} placeholder="city" />
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="Hometown">Hometown</label>
                                    <input onChange={this.ChangeHandler} type="text" name='hometown' class="form-control" id="Hometown" value={this.state.hometown} placeholder="Hometown" />
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="country">country</label>
                                    <input onChange={this.ChangeHandler} type="text" name='country' class="form-control" id="country" value={this.state.country} placeholder="country" />
                                </div>
                            </div>
                            <div class="form-row">
                                <label for='input_text_area'>About Me</label>
                                <textarea onChange={this.ChangeHandler} name='about_me' class='form-control' id='input_text_area' value={this.state.about_me} rows='4'></textarea>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

//subscribe to Redux store updates.
const mapStateToProps = (state) => ({
    // variables below are subscribed to changes in loginState variables (redirectVar,Response) and can be used with props.
    ...state.profile
})


export default withApollo(edit_profile);
// export default connect(mapStateToProps, { Profile_fetch })(edit_profile);
//export default Login;
