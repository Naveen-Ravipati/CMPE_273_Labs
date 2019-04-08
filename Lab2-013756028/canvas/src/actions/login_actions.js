// All Login actions should be done, variables must be imported from types.js
import { SUBMIT_LOGIN } from './types';
import axios from "axios";

//const ROOT_URL = "http://localhost:3001";

export const submit_login = (username, password,student_or_faculty) => dispatch => {
    //code here
    alert("Actions : verfying login...");
    axios.defaults.withCredentials = true;
    const data = {
        username: username,
        password: password,
        student_or_faculty: student_or_faculty
    }
    console.log(data);

    /********************LOGIN **************************/
    axios.post('http://localhost:3001/login', data)
        .then(response => {
            alert("response received after login :", response.status);
            console.log(response.status);
            dispatch({
                type: SUBMIT_LOGIN,
                payload: response.status,

            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response.status);
            dispatch({
                //ERROR 400 status
                type: SUBMIT_LOGIN,
                payload: error.response.status,

            })
        })
}
