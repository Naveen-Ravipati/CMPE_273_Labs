import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Delete extends Component{

    constructor(){
        //Call the constrictor of Super class i.e The Component
        super();
        this.state = {
            BookID : "",
            Flag : false
        }
            //Bind the handlers to this class
            this.BookIDChangeHandler = this.BookIDChangeHandler.bind(this);
            this.delete = this.delete.bind(this);
    }

    BookIDChangeHandler = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }

    delete = (e) => {
        e.preventDefault();
        var headers = new Headers();
        const data = {
            BookID : this.state.BookID
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log(response)
                console.log("Status Code : ",response.status);
                if(response.data=="No book"){
                    alert('The BookID entered doesn\'t exist')
                    this.setState({
                        Flag : false
                    })
                }else {
                    this.setState({
                        Flag : true
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
            <div class="container">
                {redirectVar}
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input onChange = {this.BookIDChangeHandler} type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick = {this.delete} class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
        )
    }
}

export default Delete;