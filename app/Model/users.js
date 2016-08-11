import React, { Component } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';

Parse.serverURL = "https://z.proximac.org:1337/parse";
Parse.initialize('textgo', 'mytextgoapp');

export default class Users {
	constructor(id) {
		this.id = id; 
  }

  static signUp(username, password, callback) {
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", username);
		user.signUp(null).then(function(_user){
			console.log('sign up OK')
		}, function(err){
			console.log('sign up not OK');
			console.log(err.message);
		});
  }
}