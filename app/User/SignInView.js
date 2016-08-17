'use strict';

import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';
import Users from '../Model/users';
import MyNavigationBar from '../Components/MyNavigationBar';
import Main from '../Components/main';
import * as userActions from '../actions/userActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert,
  ScrollView,
} from 'react-native';

class SignInView extends Component {
  constructor(props) {
    super(props);
    console.log('SignInView Constructor' + props.visible);
    this.state = {
      username: "",
      password: "",
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {isLoggedIn} = nextProps;
    if (isLoggedIn) {
        this.props.navigator.push({
          component: Main,
        });
    }
  }

  rightButtonHandler() {
    const {actions} = this.props;
    const {signInAsync} = actions;
    signInAsync(this.state.username, this.state.password, (err)=>{
      console.log('SIGN IN rightButtonHandler');
      if (err)
        alert(err.message);
      else {
        console.log('SIGN IN OK');
      }
    });
  }

  render() {
    const leftButtonConfig = {
      title: 'Cancel',
      handler: this.props.modalClose
    };

    const rightButtonConfig = {
      title: 'Login',
      handler: this.rightButtonHandler.bind(this)
    };

    const titleConfig = {
      title: 'SIGN IN',
    };

    return (
      <View style={styles.container}>
        <MyNavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig}
        />
        <ScrollView keyboardShouldPersistTaps={true}>
          <View style={styles.componentsContainer}>
            <TextField label={'Email'} value={this.state.username} autoCorrect={false} autoCapitalize={'none'} highlightColor={'#00BCD4'}   onChangeText={(text)=>{this.setState({username: text})}}/>
            <TextField label={'Password'} value={this.state.password} highlightColor={'#00BCD4'} autoCapitalize={'none'} onChangeText={(text)=>{this.setState({password: text})}}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  state: state.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(SignInView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  componentsContainer: {
    margin: 20
  },
  buttonStyle: {
    backgroundColor: '#196EEF',
    borderColor: '#196EEF',
    borderWidth: 2,
    borderRadius: 10,
		margin: 10,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
  },
});