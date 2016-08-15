'use strict';

import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';
import Users from '../Model/users';
import MyNavigationBar from '../Components/MyNavigationBar';
import phoneFormat from 'phoneformat-react-native';
import SignUpMobileVerify from './SignUpMobileVerify';

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert,
  ScrollView,
} from 'react-native';

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    console.log('SignUpView Constructor' + props.visible);
    this.state = {
      username: "",
      password: "",
      mobile: ""
    }
  }

  IsNumeric(val) {
    return Number(parseFloat(val)) == val;
  }

  formatOnChangeText(text) {
    let formattedNumber = phoneFormat.formatLocal('US', text);
    this.setState({ mobile: formattedNumber });
  }

  rightButtonHandler() {
    if (!phoneFormat.isValidNumber(phoneFormat.formatLocal('US', this.state.mobile), 'US')) {
      alert('Phone number is not valid');
      return;
    }

    console.log('rightButtonHandler');
    console.log(this.state.username, this.state.password)
    Users.signUp(this.state.username, this.state.password, (err) => {
      console.log('SIGN UP rightButtonHandler');
      if (err)
        alert(err.message);
      else {
        this.props.navigator.push({
          component: SignUpMobileVerify,
          passProps: {
            mobile: phoneFormat.cleanPhone(this.state.mobile)
          }
        });
      }
    });
  }

  render() {
    const leftButtonConfig = {
      title: 'Cancel',
      handler: this.props.modalClose
    };

    const rightButtonConfig = {
      title: 'Next',
      handler: this.rightButtonHandler.bind(this)
    };

    const titleConfig = {
      title: 'SIGN UP',
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
            <TextField label={'Email'} value={this.state.username} autoCorrect={false} autoCapitalize={'none'} highlightColor={'#00BCD4'}   onChangeText={(text) => { this.setState({ username: text }) } }/>
            <TextField label={'Password'} value={this.state.password} highlightColor={'#00BCD4'} onChangeText={(text) => { this.setState({ password: text }) } }/>
            <TextField label={'Mobile'} value={this.state.mobile} highlightColor={'#00BCD4'}
              keyboardType={'numeric'}
              returnKeyType={'done'}
              onChangeText={(text) => { this.formatOnChangeText(text) } }
              onSubmitEditing={() => { this.rightButtonHandler } }
              />
          </View>

        </ScrollView>
      </View>
    );
  }
}

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