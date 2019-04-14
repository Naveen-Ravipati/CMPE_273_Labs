import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class calc extends Component {

    constructor(){
        //Call the constructor of Super class i.e The Component
        super();
        this.state = {
            input : "",
            previous : ''
        }
        var except_list = ['+','-','*','%','/','.']
            //Bind the handlers to this class
            this.ChangeHandler = this.ChangeHandler.bind(this);
            this.del_click = this.del_click.bind(this);
            // this.calc = this.calc.bind(this);
    }

    ChangeHandler = async(e) => {  
        e.preventDefault();
        e.persist();
        let flg = false
        console.log(`length ${this.state.input.length}`)
        if(this.state.input.includes("Infinity") || this.state.input.includes("Error")){
            //alert("infinity exists");
            await this.setState({
                input :''
            })
            //alert(this.state.input+"hj");
            console.log(`inside infinity ${this.state.input}`)
        }
        if(this.state.previous == '+' || this.state.previous == '-' || this.state.previous == '*' || this.state.previous == '/' || this.state.previous == '%' || this.state.previous == '.'){  
        flg = true
        }  
        if(flg == true && (e.target.value == '+' || e.target.value == '-' || e.target.value == '*' || e.target.value == '/' || e.target.value == '%' || e.target.value == '.')){
            this.setState({
                input : this.state.input,
                previous : this.state.previous
            })
        }
        else{
        console.log(e.target)
        this.setState({
            input : this.state.input+e.target.value,
            previous : e.target.value
        })
    }
    }

    del_click = (e) => {
        e.preventDefault();
        var headers = new Headers();
        console.log(`del button ${typeof(this.state.input)}`)
        if(this.state.input){
        this.setState({
            input: this.state.input.slice(0,-1),
            //previous : this.state.input.slice((this.state.input.length)-2,(this.state.input.length)-1)
            previous : this.state.input.slice(-2,-1)
        })
    }
    }

    equal_Click = (e) => {
        e.preventDefault();
        var headers = new Headers();
        const data = {
            input : this.state.input,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/',data)
            .then(response => {
                
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log(typeof(response.data.toString()))
                    this.setState({
                        input : response.data.toString()
                    })
                }else{
                    console.log('Invalid Response')
                }
            });
    }


    render(){
        // let abc = document.getElementById('result')
        // abc = this.state.input
        console.log(this.state)
        return(

                    <div id="background">
                        <div style={{paddingBottom: `30px`}} id="result">{this.state.input}</div>
                         <div id="main">
                             <div id="first-rows">
                              <button onClick= {this.del_click} class="del-bg" id="delete">Del</button>
                                 <button onClick= {this.ChangeHandler}  value = '%' class="btn-style operator opera-bg fall-back">%</button>
                                 <button onClick= {this.ChangeHandler} value="+" class="btn-style opera-bg value align operator">+</button>
                             </div>
                                 
                               <div class="rows">
                                 <button onClick= {this.ChangeHandler} value="7" class="btn-style num-bg num first-child">7</button>
                                 <button onClick= {this.ChangeHandler}  value="8" class="btn-style num-bg num">8</button>
                                 <button onClick=  {this.ChangeHandler} value="9" class="btn-style num-bg num">9</button>
                                 <button onClick= {this.ChangeHandler} value="-" class="btn-style opera-bg operator">-</button>
                                </div>
                                 
                                 <div class="rows">
                                 <button onClick= {this.ChangeHandler} value="4" class="btn-style num-bg num first-child">4</button>
                                 <button onClick= {this.ChangeHandler} value="5" class="btn-style num-bg num">5</button>
                                 <button onClick= {this.ChangeHandler} value="6" class="btn-style num-bg num">6</button>
                                 <button onClick= {this.ChangeHandler} value="*" class="btn-style opera-bg operator">x</button>
                                 </div>
                                 
                                 <div class="rows">
                                 <button onClick= {this.ChangeHandler} value="1" class="btn-style num-bg num first-child">1</button>
                                 <button onClick= {this.ChangeHandler} value="2" class="btn-style num-bg num">2</button>
                                 <button onClick= {this.ChangeHandler} value="3" class="btn-style num-bg num">3</button>
                                 <button onClick= {this.ChangeHandler} value="/" class="btn-style opera-bg operator">/</button>
                                 </div>
                                 
                                 <div class="rows">
                                 <button onClick= {this.ChangeHandler} value="0" class="num-bg zero" id="delete">0</button>
                                 <button onClick= {this.ChangeHandler} value="." class="btn-style num-bg period fall-back">.</button>
                                 <button onClick= {this.equal_Click} type = 'submit' name = 'equal' value="=" id="eqn-bg" class="eqn align">=</button>
                                 </div>                                
                             </div>                        
                         </div>
                        
        )
    }
}

export default calc;