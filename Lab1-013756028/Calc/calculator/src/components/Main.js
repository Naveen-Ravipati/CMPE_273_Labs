import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import calc from './calculator/calc';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={calc}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;