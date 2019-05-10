import React, { Component } from 'react';
import axios from 'axios';

class Generate_permission_numbers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [],
            student_or_faculty: '',
            course_id: '',
            student_id: '',
            faculty_id: '',
            visibility:''
        }
    }

    componentDidMount =() => {
        let student_or_faculty = localStorage.getItem('student_or_faculty')
        if(student_or_faculty == 'student'){
            this.setState({
                visibility: 'hidden'
            })
        }
        else{
            this.setState({
                visibility: 'visible'
            })
        }
    }

    new_function=async ()=>{
        var permission_numbers = []
        let temp
        for(let i = 0;i<10;i++){
            temp = Math.floor((Math.random() * 1000000) + 1);
            permission_numbers.push(temp)
            }
        console.log(permission_numbers)
        
        const data = {
            course_id:localStorage.getItem('course_id'),
            permission_number_list: permission_numbers    
        }
        await axios.post('http://localhost:3001/permission_numbers_store', data)
            .then((response) => {
                if(response.status == 200){
                    alert('Permission Numbers generated')
                }
            });
        window.location.reload()
    }




    render() {
                return (
                    <div style ={{visibility:this.state.visibility}}>
                        <button onClick = {this.new_function} className = 'btn btn-primary' style = {{marginLeft: '10%',marginTop: '10%'}}>Generate Permission Numbers</button>
                    </div>
                )}
            
        
}


    //export Announcements Component
    export default Generate_permission_numbers;