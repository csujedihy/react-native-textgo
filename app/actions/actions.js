import * as types from './types';

export function logIn() {
  return {
	  type: types.LOGGED_IN
  };
}

export function logOut() {
  return {
	  type: types.LOGGED_OUT
  };
}

export function localLogIn(){
  return{
    type: types.LOGGED_OUT
  }
}