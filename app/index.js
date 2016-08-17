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
import * as userActions from './actions/userActions';

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
  }

  setup() {
    const {state, actions} = this.props;
    const {localSigInAsync} = actions;
    localSigInAsync();
  }

  componentDidMount() {
    this.setup();
  }

  render() {
    const {state, actions} = this.props;
    console.log('App re-render ' + state.isLoggedIn);

    if (state.isLoggedIn == 0) {
      return (<View></View>);
    } else if (state.isLoggedIn == 1) {
      return (
        <View style={styles.container} >
          <StatusBar backgroundColor='transparent' animated={true} translucent={true}/>
          <Main/>
        </View>
      );
    } else if (state.isLoggedIn == 2) {
      return (
        <View style={styles.container} >
          <StatusBar backgroundColor='transparent' animated={true} translucent={true}/>
          <User/>
        </View>
      );
    }
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