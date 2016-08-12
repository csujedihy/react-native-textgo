'use strict';

import React, { Component } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';

import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert
} from 'react-native';

export default class SignIn extends Component {
  render() {
    var username = "";
    var password = "";
    return (
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.componentsContainer}>
                <TextField label={'Email'} highlightColor={'#00BCD4'} onChangeText={(text)=>{username=text}}/>
                <TextField label={'Password'} highlightColor={'#00BCD4'} onChangeText={(text)=>{password=text}}/>
                <Button
                  style={styles.buttonStyle} textStyle={styles.textStyle}
                  onPress={() => {
                    console.log(username);
                    console.log(password);
                    Users.signIn(username, password, (err)=>{
                      if (err)
                        alert(err.message);
                      else
                        console.log('Sign up successfully!');
                    });
                  }}>
                  LOG IN
                </Button>
              </View>

            </ScrollView>
          </View>    
          );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 22,
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