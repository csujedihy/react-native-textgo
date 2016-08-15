import React, { Component } from 'react';

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert,
  Modal,
  Navigator,
  TouchableOpacity
} from 'react-native';

export function updateMapper(_mapper) {
	mapper = _mapper;
}

export var mapper = {
			LeftButton(route, navigator, index, navState) {
				if (index >= 0) {
					return (
						<View style={styles.navContainer}>
							<TouchableOpacity
								underlayColor='transparent'
								onPress={() => {if (index > 0) {navigator.pop()}}}
								style={styles.leftNavButton}>
								<Text style={styles.leftNavButtonText}>
									Back
								</Text>
							</TouchableOpacity>
						</View>
					);
				} else {
					return null;
				}
			},
			RightButton(route, navigator, index, navState) {
				if (1 || route.onPress)
					return (
						<View style={styles.navContainer}>
							<TouchableOpacity
								onPress={() => alert('1')}
								style={styles.rightNavButton}>
								<Text style={styles.rightNavButtonText}>
									{route.rightText || 'Next'}
								</Text>
							</TouchableOpacity>
						</View>
					);
			},
      // title
    	Title(route, navigator, index, navState) {
        return (
          <View style={styles.navContainer}>
            <Text style={styles.title}>
              SIGN UP
            </Text>
          </View>
        );
      }
};


const styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
	leftNavButton: {
		marginLeft: 10
	},
	rightNavButton: {
		marginRight: 10
	},
  navContainer: {
    backgroundColor: '#81c04d',
    paddingTop: 12,
    paddingBottom: 10,
  },
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