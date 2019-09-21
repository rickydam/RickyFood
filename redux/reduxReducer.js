import {combineReducers} from 'redux';
import {SET_USER_DATA, SET_RESTAURANT} from './types';

let initialState = {userData: null, restaurant: null};

const reduxReducer = (state=initialState, action) => {
  let updatedState;
  switch(action.type) {
    case SET_USER_DATA:
      updatedState = {};
      updatedState.userData = action.payload;
      updatedState.restaurant = state.restaurant;
      return updatedState;
    case SET_RESTAURANT:
      updatedState = {};
      updatedState.userData = state.userData;
      updatedState.restaurant = action.payload;
      return updatedState;
    default:
      return state;
  }
};

export default combineReducers({
  redux: reduxReducer
});
