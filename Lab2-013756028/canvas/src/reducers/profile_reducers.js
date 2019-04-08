//states of individual comoponents go here.
import { PROFILE } from '../actions/types';

const initialState = {
  redirectVar: false,
  response: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      if (action.payload === 200) {
        console.log("Reducer : PROFILE UPDATE successful !");
        console.log(action.info_fetch)
        return {
          ...state,
          ...action.info_fetch,
          response: action.payload,
        }
      } else {
        console.log("Reducer : PROFILE UPDATE Failed !");
        return {
          ...state,
          response: action.payload,

        }
      }

    default:
      return state;
  }
}