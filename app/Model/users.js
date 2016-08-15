import React, { Component } from 'react';
import AV from 'leancloud-storage';


export default class Users {
  constructor(id) {
    this.id = id; 
  }

  static signUp(username, password, callback) {
    var user = new AV.User();
    try {
      user.set("username", username);
      user.set("password", password);
      user.set("email", username);
      user.signUp(null).then(function(_user){
        console.log('sign up OK')
        if (callback)
          callback(null);
      }, function(err){
        console.log('sign up not OK');
        if (callback)
          callback(err);
      });
    } catch (error) {
      if (callback)
        callback(error);
    }

  }

  static signIn(username, password, callback) {
    AV.User.logIn(username, password, {
      success: function(user) {
        console.log('log in OK');
        if (callback)
          callback(null, user);
      },
      error: function(user, error) {
        console.log('log in err:' + error.message);
        if (callback)
          callback(error, user);
      }
    });
  }

  static signOut(callback) {
    console.log('signOut() called');
    AV.User.logOut().then(()=>{
      console.log('LogOut OK');
      if (callback)
        callback(null);
    }, (err)=>{
      console.log(err.message);
      if (callback)
        callback(err);
    });
  }

  static smsVerification(mobile, callback) {
    AV.Cloud.run('sendSMSVerification', {"cellNumber": mobile}, {
      success: function(result) {
        console.log(result);
        callback(null, result);
      },
      error: function(error) {
        alert('We can\'t send SMS message to your mobile');
        callback(error, null);
      }
    });
  }
}