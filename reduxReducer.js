import {combineReducers} from 'redux';
import {SET_USER_DATA} from './types';

let INITIAL_STATE = {
  dataArr: []
};

const reduxReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      const {dataArr} = state;
      dataArr.push(action.payload);
      const updatedState = {dataArr};
      return updatedState;
    default:
      return state;
  }
};

export default combineReducers({
  reduxUserAuthentication: reduxReducer
});
