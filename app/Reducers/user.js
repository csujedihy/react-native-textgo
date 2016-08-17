import * as types from '../actions/types';

const initialState = {
  isLoggedIn: 0,
};

function user(state = initialState, action ={}) {
  if (action.type === 'LOGGED_IN') {
    return {
      ...state,
      isLoggedIn: 1
    };
  }
  if (action.type === 'LOGGED_OUT') {
		return {
			...state,
			isLoggedIn: 2
		}
  }
  return state;
}

export default user;