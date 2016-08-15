/*
@flow
*/
'use strict';

import React, { Component } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import Main from './Components/main';
import User from './User';
import AV from 'leancloud-storage';
import Users from './Model/users';

const appId = 'OmovAetS584xzswiLQ7l60sp-MdYXbMMI';
const appKey = 'kfol3uTyBLnnGHnPj3lF7fqQ';
AV.init({
  appId,
  appKey,
  region: 'us',
});

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert,
  Navigator,
} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class App extends Component {
  
  constructor() {
    super();
    this.state = {currentUser: null};
  }
  
  _setCurrentUser() {
    AV.User.currentAsync().then((currentUser)=>{
        if (currentUser) {
            // Alert.alert('', JSON.stringify(currentUser));
            console.log('Has currentUser');
            // FIXME: maybe there is a 'this' trap
            this.setState({currentUser: currentUser});
        }
    });
  }

  componentDidMount() {
    Users.signOut();
    this._setCurrentUser();
  }

  render() {
      if (this.state.currentUser)
        return (
            <View style={styles.container} >
              <StatusBar backgroundColor='transparent' animated={true} translucent={true} barStyle="light-content"/>
              <Main/>
            </View>
        );
      else
        return (
          <View style={styles.container} >
            <StatusBar backgroundColor='transparent' animated={true} translucent={true} barStyle="light-content"/>
            <User setUserCallback={this._setCurrentUser.bind(this)}/>
          </View>
        );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;
