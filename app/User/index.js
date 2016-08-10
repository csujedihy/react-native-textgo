'use strict';

import React, { Component } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert
} from 'react-native';

import {
  MKTextField,
  MKColor,
	MKButton
} from 'react-native-material-kit';

export default class User extends Component {
  render() {
    return (
      <View style={styles.container} >
				<MKButton
					backgroundColor={MKColor.Teal}
					shadowRadius={2}
					shadowOffset={{width:0, height:2}}
					shadowOpacity={.7}
					shadowColor="black"
					onPress={() => {
						Alert.alert('hi, raised button!');
					}}
					style={styles.signButton}					
					>
					<Text pointerEvents="none"
								style={{color: 'white', fontWeight: 'bold',}}>
						SIGN IN
					</Text>
				</MKButton>
								<MKButton
					backgroundColor={MKColor.Teal}
					shadowRadius={2}
					shadowOffset={{width:0, height:2}}
					shadowOpacity={.7}
					shadowColor="black"
					onPress={() => {
						Alert.alert('hi, raised button!');
					}}
					style={styles.signButton}
					>
					<Text pointerEvents="none"
								style={{color: 'white', fontWeight: 'bold',}}>
						SIGN UP
					</Text>
				</MKButton>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
  },
	signButton: {
		margin: 5,
		padding: 10
	}
});
