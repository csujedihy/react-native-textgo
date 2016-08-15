'use strict';
import NavigationBar from 'react-native-navbar';
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
/* This is just a wrapper of Navbar */

export default class MyNavigationBar extends Component {
  constructor(props) {
		super(props);
  }

	render() {
		let styles = StyleSheet.create({
			myNavigationBarWrapper: {
				borderBottomWidth: 1,
				borderBottomColor: '#BABABA'
			}
		});

		return(
			<NavigationBar {...this.props} style={styles.myNavigationBarWrapper}/>
		);
	}

}