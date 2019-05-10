import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router';

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            from_student_or_faculty: '',
            to: '',
            to_student_or_faculty:'',
            conversation:[],
            conversation_old:[],
            message_content:'',
            authflag:false,
            flag:0
        }
    }
    
    ChangeHandler = (e) => {
        this.setState({
            message_content: e.target.value
        })
    }

    send_message=async(e)=>{
        // await this.setState({
        //     flag:0
        // })
        alert('send')
        let from_student_or_faculty = '';
        let from = '';
        if(localStorage.getItem('student_or_faculty') == 'student'){
            from_student_or_faculty = 'student'
            from = localStorage.getItem('student_id')
        }
        else{
            from = localStorage.getItem('faculty_id')
            from_student_or_faculty = 'faculty'
        }
        var data = 
        {
            from:from, 
            from_student_or_faculty:from_student_or_faculty,
            to:this.props.to,
            to_student_or_faculty:this.props.to_student_or_faculty,
            message_content:this.state.message_content
        }
        var token = localStorage.getItem("token");
        await axios.post('http://localhost:3001/send_message/',data,{
            headers: {"Authorization" : `Bearer ${token}`}})
            .then(response =>{  
                if(response.status == 200){
                    console.log('Message successfully updated')
                    this.setState({
                        authflag:true
                    })
                }
            });
        }

    componentDidUpdate=async(prevProps, prevState)=>{
        // shouldComponentUpdate= async(nextProps, nextState) =>{
        // alert('Did')
        // console.log(prevState.conversation)
        // console.log(this.state.conversation)
        let from_student_or_faculty = '';
        let from = '';
        if(localStorage.getItem('student_or_faculty') == 'student'){
            from_student_or_faculty = 'student'
            from = localStorage.getItem('student_id')
        }
        else{
            from = localStorage.getItem('faculty_id')
            from_student_or_faculty = 'faculty'
        }
        if(this.props.to_student_or_faculty || this.props.to){
        var data = 
        {
            from:from, 
            from_student_or_faculty:from_student_or_faculty,
            to:this.props.to,
            to_student_or_faculty:this.props.to_student_or_faculty,
        }
        var token = localStorage.getItem("token");
        await axios.post('http://localhost:3001/conversation/',data,{
            headers: {"Authorization" : `Bearer ${token}`}})
            .then(response =>{
                console.log(response.status)
                if(response.status == 200){
                    if(this.state.flag < 2){
                        this.setState({
                        conversation: response.data,
                        flag:this.state.flag + 1
                        });
                    // flag+=1
                    }
                    else{
                        this.state.flag =0
                        
                    }
                    
                }
            });
        console.log(this.state.conversation)
        }
    }

    render() {       
        var conversation = this.state.conversation.map(conversation_1 => {
            return(
                <tr>
                    <td>{conversation_1.id}</td>        
                    <td>{conversation_1.content}</td>
                </tr>
            )
        })

        return(
        <div>
            {this.props.to}
            <div style ={{border:'1px solid blue', width:'300px', height:'500px',marginTop:'15%', overflow: 'scroll'}}>
                <input onChange={this.ChangeHandler} style = {{width:'80%'}} type = 'text'></input>
                <button style = {{width:'20%'}}  onClick = {this.send_message}>send</button>
                <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conversation}
                        </tbody>
                    </table>
            </div>
        </div>
        )
    }
}

export default Conversation;