import {SET_USER_DATA, SET_RESTAURANT} from './types';

const setUserData = (userData) => ({
    type: SET_USER_DATA,
    payload: userData
});

const setRestaurant = (restaurant) => ({
    type: SET_RESTAURANT,
    payload: restaurant
});

export {
  setUserData
}