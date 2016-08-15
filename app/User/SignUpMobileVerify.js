'use strict';

import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';
import Users from '../Model/users';
import MyNavigationBar from '../Components/MyNavigationBar';
import phoneFormat from "phoneformat-react-native";

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

export default class SignUpMobileVerify extends Component {
  constructor(props) {
		super(props);
	}

  rightButtonHandler() {

	}

	render() {
		const rightButtonConfig = {
      title: 'Verify',
      handler: this.rightButtonHandler.bind(this)
    };

    const titleConfig = {
      title: 'MOBILE',
    };
		return(
			<View style={styles.container}>
				<MyNavigationBar
					title={titleConfig}
					rightButton={rightButtonConfig} />
				<ScrollView keyboardShouldPersistTaps={true}>
					<View style={styles.contentContainer}>
						<TextInput style={styles.codeInput} maxLength={1}></TextInput>
						<TextInput style={styles.codeInput} maxLength={1}></TextInput>
						<TextInput style={styles.codeInput} maxLength={1}></TextInput>
						<TextInput style={styles.codeInput} maxLength={1}></TextInput>
					</View>

				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
	contentContainer: {
		flex: 1, 
		marginTop: 200,
		alignItems: 'center', 
		flexDirection: 'row',
		justifyContent: 'center'
	},
	codeInput: {
		height: 50,
		width: 50,
		borderWidth: 1,
		fontSize: 42,
		borderColor: '#525357',
		borderRadius: 2,
		margin: 10,
		paddingLeft: 12
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