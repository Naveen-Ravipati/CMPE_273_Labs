//This is rootReducer
import { combineReducers } from 'redux';
import login_reducer from './login_reducers';
import profile_reducer from './profile_reducers'

//Reducer, just combines all the states.
export default combineReducers({
    loginState: login_reducer,
    profile: profile_reducer
});