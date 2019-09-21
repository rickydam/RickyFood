import {combineReducers} from 'redux';
import {SET_USER_DATA} from './types';

let initialState = {userData: null};

const reduxReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      let updatedState = {};
      updatedState.userData = action.payload;
      return updatedState;
    default:
      return state;
  }
};

export default combineReducers({
  redux: reduxReducer
});
