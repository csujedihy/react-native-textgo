'use strict';

import React, { Component } from 'react';

import {
  TabBarIOS,
  LayoutAnimation,
  StyleSheet,
  AppState,
  Platform,
  Alert,
  Modal,
  Image,
  View,
  Text,
} from 'react-native';

class Main extends Component {
    constructor() {
        super();
				this.state = {
					selectedTab: 'redTab',
					notifCount: 0,
					presses: 0,
				};
    }

		_renderContent(text) {
			return (
				<View>
					<Text>{text}</Text>
				</View>
			);
		}

    render() {
        return (
					<TabBarIOS
						unselectedTintColor="yellow"
						tintColor="white"
						barTintColor="darkslateblue">

						<TabBarIOS.Item
							title="Messages"
							selected={this.state.selectedTab === 'redTab'}
							onPress={() => {
								this.setState({
									selectedTab: 'redTab',
								});
							}}>
							{this._renderContent('Red Tab')}
						</TabBarIOS.Item>

						<TabBarIOS.Item
							renderAsOriginal
							title="Dial"
							selected={this.state.selectedTab === 'greenTab'}
							onPress={() => {
								this.setState({
									selectedTab: 'greenTab',
								});
							}}>
							{this._renderContent('Green Tab')}
						</TabBarIOS.Item>
					</TabBarIOS>
					
				);
    }
}

export default Main;