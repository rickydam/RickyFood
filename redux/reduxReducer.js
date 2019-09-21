import {combineReducers} from 'redux';
import {SET_USER_DATA} from './types';

let initialState = {userData: null};

const reduxReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      let newState = {};
      newState.userData = action.payload;
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  redux: reduxReducer
});
