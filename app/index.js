/*
@flow
*/
'use strict';

import React, { Component, PropTypes } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import Main from './Components/main';
import User from './User';
import AV from 'leancloud-storage';
import Users from './Model/users';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as userActions from './actions/actions';

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
  TouchableHighlight
} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class App extends Component {

  constructor() {
    super();
    this.state = { currentUser: null };
  }

  setCurrentUser() {
    AV.User.currentAsync().then((currentUser) => {
      if (currentUser) {
        // Alert.alert('', JSON.stringify(currentUser));
        console.log('Has currentUser');
        // FIXME: maybe there is a 'this' trap
        this.setState({ currentUser: currentUser });
      }
    });
  }


  componentDidMount() {
    this.setCurrentUser();
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
          <User setUserCallback={this.setCurrentUser.bind(this) }/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default connect(state => ({
    state: state.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(App);