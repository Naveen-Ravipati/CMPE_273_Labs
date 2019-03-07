import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        this.state = {
            BookID : "",
            Title : "",
            Author : "",
            Flag : false
        }
            //Bind the handlers to this class
            this.BookIDChangeHandler = this.BookIDChangeHandler.bind(this);
            this.TitleChangeHandler = this.TitleChangeHandler.bind(this);
            this.AuthorChangeHandler = this.AuthorChangeHandler.bind(this);
            this.create = this.create.bind(this);
    }

    // componentDidMount(){
    //     this.setState({
    //         Flag : false
    //     })
    // }

    BookIDChangeHandler = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }

    TitleChangeHandler = (e) => {
        this.setState({
            Title : e.target.value
        })
    }

    AuthorChangeHandler = (e) => {
        this.setState({
            Author : e.target.value
        })
    }

    create = (e) => {
        e.preventDefault();
        var headers = new Headers();
        const data = {
            BookID : this.state.BookID,
            Title : this.state.Title,
            Author : this.state.Author
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log('abc')
                if(response.status === 200){
                    this.setState({
                        Flag : true
                    })
                }else{
                    this.setState({
                        Flag : false
                    })
                }
            });
    }

    render(){
        let redirectVar = null;
        if(cookie.load('cookie') && this.state.Flag){
            redirectVar = <Redirect to= "/home"/>
        }     
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        } 
        
        return(
            
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                    <form >
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.BookIDChangeHandler}  type="text" class="form-control" name="BookID" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.TitleChangeHandler}  type="text" class="form-control" name="Title" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.AuthorChangeHandler}  type="text" class="form-control" name="Author" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.create} class="btn btn-success" type="button">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;