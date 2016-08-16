import * as types from '../actions/types';

const initialState = {
  isLoggedIn: false,
};


function user(state = initialState, action ={}) {
  if (action.type === 'LOGGED_IN') {
    return {
      state,
      isLoggedIn: true
    };
  }
  if (action.type === 'LOGGED_OUT') {
		return {
			state,
			isLoggedIn: false
		}
  }
  return state;
}

export default user;