// All Login actions should be done, variables must be imported from types.js
import { SUBMIT_LOGOUT } from './types';
import axios from "axios";

//const ROOT_URL = "http://localhost:3001";

export const submit_logout = () => dispatch => {
    //code here
    alert("Actions : verfying logout...");
    axios.defaults.withCredentials = true;

    /********************LOGOUT **************************/
            dispatch({
                type: SUBMIT_LOGOUT,
                payload: 200,

            })
}
