'use strict';

import React, { Component } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button'
import SignUp from './signup'

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert,
	ScrollView,
	Image,
	Dimensions
} from 'react-native';

import {
  MKTextField,
  MKColor,
	MKButton
} from 'react-native-material-kit';

const CARD_PREVIEW_WIDTH = 20
const CARD_MARGIN = 5;
const CARD_WIDTH = Dimensions.get('window').width;
const CARD_HEIGHT = Dimensions.get('window').height - 50;


export default class User extends Component {
	constructor() {
		super();
		this.state = {signupModalVisible: false}
	}

  render() {
		console.log('index render()' + this.state.signupModalVisible);
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
			<View style={styles.main}>
				<SignUp visible={this.state.signupModalVisible}/>
				<View style={styles.topView}>
					<ScrollView 
						style={styles.scrollView} 
						automaticallyAdjustInsets={false}
						horizontal={true}
						decelerationRate={1}
						pagingEnabled={true}
						>
						<View style={styles.scrollViewContent}> 
							<View style={styles.imageBannerContainer}><Image source={pic} style={styles.image}/></View>
							<View style={styles.imageBannerContainer}><Image source={pic} style={styles.image}/></View>
							<View style={styles.imageBannerContainer}><Image source={pic} style={styles.image}/></View>
							<View style={styles.imageBannerContainer}><Image source={pic} style={styles.image}/></View>
							<View style={styles.imageBannerContainer}><Image source={pic} style={styles.image}/></View>		
						</View>
					</ScrollView>
				</View>
				<View style={styles.bottomView}>
        <Button
          style={styles.buttonStyle} textStyle={styles.textStyle}
          onPress={() => {
            console.log('world!')
          }}>
          SIGN IN
        </Button>
				<Button
          style={styles.buttonStyle} textStyle={styles.textStyle}
          onPress={() => {
            this.setState({signupModalVisible:true});
						console.log(this.state.signupModalVisible);
          }}>
          SIGN UP
        </Button>
				</View>
			</View>

    );
  }
}

const styles = StyleSheet.create({
	scrollViewContent: {
		flexDirection:'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flex: 1
  },
	image: {
		height: CARD_HEIGHT,
		width: CARD_WIDTH
	},
	imageBanner: {
    flex: 1,
    backgroundColor: '#ccc',
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
	scrollView: {
    backgroundColor: '#FFFFFF',
		flex: 1
  },
  main: {
		flex: 1,
		flexDirection: 'column',
	},
	topView: {
    flex: 1,
	},
	bottomView: {
		flexDirection: 'row',
		height: 60
  },
	signButton: {
		margin: 10,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	buttonText: {
		textAlign: 'center',
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
	textStyle: {
    color: 'white'
  },
});
