// All Login actions should be done, variables must be imported from types.js
import { SUBMIT_SIGNUP } from './types';
import axios from "axios";

//const ROOT_URL = "http://localhost:3001";

export const submit_signup = (new_email,new_password,new_studentid,new_student_or_faculty) => dispatch => {
    //code here
    alert("Actions : verfying Signup...");
    axios.defaults.withCredentials = true;
    const data = {
        new_email: new_email,
        new_password: new_password,
        new_studentid: new_studentid,
        new_student_or_faculty: new_student_or_faculty
    }
    console.log(data);

    /********************Signup **************************/
    axios.post('http://localhost:3001/new_user', data)
        .then(response => {
            alert("response received after Signup :", response.status);
            console.log(response.status);
            dispatch({
                type: SUBMIT_SIGNUP,
                payload: response.status,

            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response.status);
            dispatch({
                //ERROR 400 status
                type: SUBMIT_SIGNUP,
                payload: error.response.status,

            })
        })
}
