import React, { Component } from 'react';
import axios from 'axios';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            quiz_id:'',
            question_number:'',
            question:'',
            option_1:'',
            option_2:'',
            option_3:'',
            option_4:'',
            correct_answer:''
        }
    }

    quiz_id_ChangeHandler = (e) => {
        this.setState({
            quiz_id: e.target.value
        })
    }

    question_number_ChangeHandler = (e) => {
        this.setState({
            question_number: e.target.value
        })
    }

    question_ChangeHandler = (e) => {
        this.setState({
            question: e.target.value
        })
    }

    option_1_ChangeHandler = (e) => {
        this.setState({
            option_1: e.target.value
        })
    }

    option_2_ChangeHandler = (e) => {
        this.setState({
            option_2: e.target.value
        })
    }

    option_3_ChangeHandler = (e) => {
        this.setState({
            option_3: e.target.value
        })
    }

    option_4_ChangeHandler = (e) => {
        this.setState({
            option_4: e.target.value
        })
    }

    correct_answer_ChangeHandler = (e) => {
        this.setState({
            correct_answer: e.target.value
        })
    }

    submit_question = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            course_id: localStorage.getItem('course_id'),
            quiz_id: this.state.quiz_id,
            question_number: this.state.question_number,
            question: this.state.question,
            option_1: this.state.option_1,
            option_2: this.state.option_2,
            option_3: this.state.option_3,
            option_4: this.state.option_4,
            correct_answer: this.state.correct_answer
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/submit_quiz_question', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log('Success')
                }
                else {
                    console.log('Failure')
                }
            });
            alert('Question Submitted')
    }

    click = (e) => {
        localStorage.setItem('quiz_id', e)
        this.props.callbackfromparent();
    }

    componentDidMount = async () => {
        const data = {
            course_id: localStorage.getItem('course_id')
        }
        await axios.post('http://localhost:3001/quizzes', data)
            .then((response) => {
                //update the state with the response data
                if (this.state.quizzes == '') {
                    console.log("fcgvhjk", response.data)
                    this.setState({
                        quizzes: this.state.quizzes.concat(response.data)
                    });
                }
                console.log('here :' + this.state.quizzes)
            });
    }


    render() {
        let a = ''
        let details = this.state.quizzes.map(quiz => {
            if (quiz.course_id == localStorage.getItem('course_id') && a != quiz.quiz_id) {
                a = quiz.quiz_id
                return (
                    <div class='jumbotron jumbotron-fluid'><h4><a onClick={this.click.bind(this, quiz.quiz_id)}>{quiz.quiz_id}</a></h4></div>
                )
            }
        })

        return (
            // <div class = 'jumbotron jumbotron-fluid'>
            <div class='container'>
                <div class='class row'>
                    <h2>Quizzes</h2>
                    <button class='btn btn-primary' type='button' data-toggle="modal" data-target="#myModal" style={{ marginLeft: '70%', marginBottom: '2%' }}><span class='fas fa-plus-circle'></span>Create New Quiz</button>
                </div>
                {details}
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div style={{ backgroundColor: 'yellow' }} class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Quiz Question</h4>
                            </div>
                            <div class="modal-body">
                                <div style={{ marginBottom: '5%' }}>
                                    <input onChange={this.quiz_id_ChangeHandler} type='text' required='required' name='quiz_id' placeholder='QUIZ ID'></input>
                                </div>
                                <div style={{ marginBottom: '5%' }}>
                                    <input onChange={this.question_number_ChangeHandler} type='text' required='required' name='question_number' placeholder='Question Number'></input>
                                </div>            
                                <div style={{ marginBottom: '5%' }}>
                                    <input onChange={this.question_ChangeHandler} type='text' required='required' name='question' placeholder='Question'></input>
                                </div>
                                <div style={{ marginBottom: '5%' }}>
                                    <input onChange={this.option_1_ChangeHandler} type='text' required='required' name='Option_1' placeholder='Option 1'></input>
                                </div>
                                <div style={{ marginBottom: '5%' }}>
                                    <input onChange={this.option_2_ChangeHandler} type='text' required='required' name='Option_2' placeholder='Option 2'></input>
                                </div>
                                <div style={{ marginBottom: '5%' }}>
                                    <input onChange={this.option_3_ChangeHandler} type='text' required='required' name='Option_3' placeholder='Option 3'></input>
                                </div>
                                <div style={{ marginBottom: '5%' }}>
                                    <input onChange={this.option_4_ChangeHandler} type='text' required='required' name='Option_4' placeholder='Option 4'></input>
                                </div>
                                <div style={{ marginBottom: '5%' }}>
                                    <input onChange={this.correct_answer_ChangeHandler} type='text' required='required' name='Correct_Answer' placeholder='Correct Answer'></input>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <center>
                                    <button onClick={this.submit_question} class="btn btn-default" data-dismiss="modal">Submit</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
//export Announcements Component
export default Quiz;