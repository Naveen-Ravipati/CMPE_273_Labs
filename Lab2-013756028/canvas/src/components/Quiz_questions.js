import React, { Component } from 'react';
import axios from 'axios';

class Quiz_questions extends Component {
    constructor(props){
        super(props);
        this.state = {  
            quiz_questions : [],
            course_id:'',
            quiz_id:'',
            quiz_responses:[],
            score: 0,
            student_id:'',
            student_or_faculty:'student'

        }
    }

    // changehandler = async(e) =>{
    //     await this.setState({
    //         [e.target.name]: e.target.value
    //     })
    //     console.log(this.state)
    // }

    changehandler = async(e) =>{
        let var1 = {
            'question_number':e.target.name,
            'response':e.target.value
        }
        this.state.quiz_responses.map((responses,index) =>{
            if(responses.question_number == var1.question_number){
                this.state.quiz_responses.splice(index,1)
            }
        })
        this.state.quiz_responses.push(var1)
        console.log(JSON.stringify(this.state.quiz_responses))

    }

    componentDidMount=async()=>{
        const data = {
            course_id: localStorage.getItem('course_id'),
            quiz_id: localStorage.getItem('quiz_id')
        }
       await axios.post('http://localhost:3001/quiz_questions',data)
                .then(async(response) => {
                //update the state with the response data
                    console.log("set state",response.data)
                    await this.setState({
                        quiz_questions : response.data[0].quizzes
                    })
              await console.log(this.state.quiz_questions)
            });
    }

    submit_responses = async(e) =>{
        console.log("here")
        await this.setState({
            course_id: localStorage.getItem('course_id'),
            quiz_id: localStorage.getItem('quiz_id'),
            student_id:localStorage.getItem('student_id'),
            student_or_faculty: localStorage.getItem('student_or_faculty')
        })
        await axios.post('http://localhost:3001/quiz_submit',this.state)
        .then((response) => {
            console.log(response.data)
            this.setState({
                score : response.data
            })
    });
    console.log(this.state.score)
    alert('Response Recorded')
    }


    render(){
        //iterate over books to create a table row

        var details = this.state.quiz_questions.map(quiz_question => {
                // console.log("sfd")
                return(
                    <div>
                        <div> 
                            <h4>{quiz_question.question_number}) {quiz_question.question}</h4>
                            <input type = 'radio' onChange = {this.changehandler} name = {quiz_question.question_number} id = 'a' value = {quiz_question.option_1}/>{quiz_question.option_1}<br></br>
                            <input type = 'radio' onChange = {this.changehandler} name = {quiz_question.question_number} id = 'b' value = {quiz_question.option_2}/>{quiz_question.option_2}<br></br>
                            <input type = 'radio' onChange = {this.changehandler} name = {quiz_question.question_number} id = 'c' value = {quiz_question.option_3}/>{quiz_question.option_3}<br></br>
                            <input type = 'radio' onChange = {this.changehandler} name = {quiz_question.question_number} id = 'd' value = {quiz_question.option_4}/>{quiz_question.option_4}<br></br>
                        </div>
                    </div>
                )
            })
                
        //if not logged in go to login page

        return(
            <div class = 'container'>
                <div class = 'class row'><h2>Quizzes</h2></div>
                {details}
                <div><button onClick = {this.submit_responses.bind(this)}>Submit</button></div>
            </div>
        
        )
    }

}
//export Announcements Component
export default Quiz_questions;