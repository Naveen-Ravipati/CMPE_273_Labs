// All Login actions should be done, variables must be imported from types.js
import { PROFILE } from './types';
import axios from "axios";

//const ROOT_URL = "http://localhost:3001";

export const Profile_fetch = () => dispatch => {
    //code here
    // alert("Actions :Profile details ...");
    axios.defaults.withCredentials = true;
    // this.setState(
    //     {
    //     student_or_faculty: localStorage.getItem('student_or_faculty'),
    //     student_id: localStorage.getItem('student_id'),
    //     faculty_id: localStorage.getItem('faculty_id')
    //     })
    let data = {
        student_or_faculty: localStorage.getItem('student_or_faculty'),
        student_id: localStorage.getItem('student_id'),
        faculty_id: localStorage.getItem('faculty_id')
    }

    var token = localStorage.getItem("token");

    /********************LOGIN **************************/
    axios.post('http://localhost:3001/edit_profile',data,{
        headers: {"Authorization" : `Bearer ${token}`}})
        .then(response => {
            // alert("response received after profile click :", response.status);
            console.log(response.status);
            console.log(response.data[0])
            let info_fetch = response.data[0]
            dispatch({
                // ...response.data[0],
                info_fetch,
                type: PROFILE,
                payload: response.status,

            })
        })
        // .catch((error) => {
        //     console.log("Action Catch : ", error.response.status);
        //     dispatch({
        //         //ERROR 400 status
        //         type: PROFILE,
        //         payload: error.response.status,

        //     })
        // })
}
