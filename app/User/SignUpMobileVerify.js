'use strict';

import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';
import Users from '../Model/users';
import MyNavigationBar from '../Components/MyNavigationBar';
import phoneFormat from "phoneformat-react-native";
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
  TextInput
} from 'react-native';

class SignUpMobileVerify extends Component {
  constructor(props) {
    super(props);
    this.smsCode = "";
    this.d1 = "";
    this.d2 = "";
    this.d3 = "";
    this.d4 = "";
  }

  componentDidMount() {
    let mobile = '1' + this.props.mobile;
    Users.smsVerification(mobile, (err, result) => {
      if (err) {
        this.props.navigator.pop();
      } else {
        this.smsCode = result;
      }
    });
  }

  rightButtonHandler() {
    const {actions} = this.props;

    let smsInput = this.d1 + this.d2 + this.d3 + this.d4;
    if (smsInput == this.smsCode) {
      actions.signUp();
    } else {
      alert('Wrong verification code');
      let digitInputs = [this.refs.d1, this.refs.d2, this.refs.d3, this.refs.d4];
      digitInputs.map((e, i) => { e.clear() });
      this.refs.d1.focus();
    }
  }

  render() {
    const leftButtonConfig = {
      title: 'Back',
      handler: () => {
        this.props.navigator.pop()
      }
    };
    const rightButtonConfig = {
      title: 'Verify',
      handler: this.rightButtonHandler.bind(this)
    };
    const titleConfig = {
      title: 'MOBILE',
    };
    return (
      <View style={styles.container}>
        <MyNavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig}
          />
        <ScrollView keyboardShouldPersistTaps={true}>
          <View style={styles.textContainer}>
            <Text>You will receive the verification code in a SMS message.</Text>
          </View>

          <View style={styles.codeContainer}>
            <View style={styles.codeInputWrapper}>
              <TextInput style={styles.codeInput} ref={"d1"} maxLength={1} onChangeText={(text) => {
                this.d1 = text;
                this.refs.d2.focus()
              }
              }></TextInput>
            </View>
            <View style={styles.codeInputWrapper}>
              <TextInput style={styles.codeInput} ref={"d2"} maxLength={1} onChangeText={(text) => {
                this.d2 = text;
                this.refs.d3.focus()
              }
              }></TextInput>
            </View>
            <View style={styles.codeInputWrapper}>
              <TextInput style={styles.codeInput} ref={"d3"} maxLength={1} onChangeText={(text) => {
                this.d3 = text;
                this.refs.d4.focus()
              }
              }></TextInput>
            </View>
            <View style={styles.codeInputWrapper}>
              <TextInput style={styles.codeInput} ref={"d4"} maxLength={1} onChangeText={(text) => {
                this.d4 = text;
                this.rightButtonHandler();
              }
              }></TextInput>
            </View>

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
)(SignUpMobileVerify);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 5
  },
  codeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  codeInputWrapper: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#525357',
    borderRadius: 2,
    margin: 10,
  },
  codeInput: {
    height: 50,
    width: 50,
    fontSize: 42,
    borderColor: '#525357',
    borderRadius: 2,
    paddingLeft: 12,
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
  }
});