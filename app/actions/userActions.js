import * as types from './types';
import Users from '../Model/users';

export function signIn() {
  return {
	  type: types.LOGGED_IN
  };
}

export function signInAsync(username, password, callback) {
  return dispatch => {
    Users.signIn(username, password, (err)=>{
      if (!err) {
        dispatch(signIn());
      }
      callback(err);
    });
  }
}

export function signUp() {
  return signIn();
}

export function signOut() {
  return {
	  type: types.LOGGED_OUT
  };
}

export function signOutAsync() {
  return dispatch => {
    Users.signOut((err)=>{
      if (!err)
        dispatch(signOut());
    });
  }
}

export function localSigInAsync(){
  return dispatch => {
    Users.setCurrentUser((currentUser) => {
      console.log('localSigInAsync');
      if (currentUser) {
        dispatch(signIn());
      } else {
        dispatch(signOut());
      }
    });
  }
}