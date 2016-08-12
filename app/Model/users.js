import React, { Component } from 'react';
import AV from 'leancloud-storage';


export default class Users {
	constructor(id) {
		this.id = id; 
  }

  static signUp(username, password, callback) {
		var user = new AV.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", username);
		user.signUp(null).then(function(_user){
			console.log('sign up OK')
			callback(null);
		}, function(err){
			console.log('sign up not OK');
			callback(err);
		});
  }

	static signIn(username, password, callback) {
		AV.User.logIn(username, password, {
			success: function(user) {
				console.log('log in OK');
			},
			error: function(user, error) {
				console.log('log in err:' + error.message);
				callback(error);
			}
		});
	}
}