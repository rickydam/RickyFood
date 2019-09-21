import {combineReducers} from 'redux';
import {SET_USER_DATA} from './types';

let initialState = {userData: null};

const reduxReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      state.userData = action.payload;
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  redux: reduxReducer
});
