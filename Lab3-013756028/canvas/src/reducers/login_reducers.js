//states of individual comoponents go here.
import { SUBMIT_LOGIN, SUBMIT_LOGOUT, SUBMIT_SIGNUP } from '../actions/types';

const initialState = {
  redirectVar: false,
  response: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_LOGIN:
      if (action.payload === 200) {
        console.log("Reducer : login successful !");
        return {
          ...state,
          redirectVar: true,
          response: action.payload,

        }
        
      } else {
        console.log("Reducer : login Failed !");
        return {
          ...state,
          redirectVar: false,
          response: action.payload,

        }
      }
      case SUBMIT_LOGOUT:
      if (action.payload === 200) {
        console.log("Reducer : logout successful !");
        return {
          ...state,
          redirectVar: false,
          response: action.payload,
        }
      } else {
        console.log("Reducer : logout Failed !");
        return {
          ...state,
          redirectVar: true,
          response: action.payload,
        }
      }

      case SUBMIT_SIGNUP:
      if (action.payload === 200) {
        console.log("Reducer : Signup successful !");
        return {
          ...state,
          response: action.payload,
        }
      } else {
        console.log("Reducer : Signup Failed !");
        return {
          ...state,
          response: action.payload,
        }
      }

    default:
      return state;
  }
}