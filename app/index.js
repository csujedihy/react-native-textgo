/*
@flow
*/
'use strict';

import React, { Component } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import Main from './Components/main';
import User from './User';

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert
} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

Parse.serverURL = "https://z.proximac.org:1337/parse";
Parse.initialize('textgo', 'mytextgoapp');

class App extends Component {
  
  constructor() {
    super();
    this.state = {currentUser: null};
  }
  
  componentDidMount() {
    Parse.User.currentAsync()
    .then((currentUser)=>{
        if (currentUser) {
            Alert.alert('', JSON.stringify(currentUser));
            this.setState({currentUser: currentUser});
        }
    });
  }

  /*
  render() {
    if (this.state.currentUser)
      return (
          <View style={styles.container} >
            <StatusBar backgroundColor='transparent' animated={true} translucent={true} barStyle="light-content"/>
            <Main/>
          </View>
      );
    else
      return (
        <View style={styles.container} >
          <StatusBar backgroundColor='transparent' animated={true} translucent={true} barStyle="light-content"/>
          <User/>
        </View>
      );
  }
}
*/

render() {
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) =>
          <MyScene
            title={route.title}

            // Function to call when a new scene should be displayed           
            onForward={ () => {    
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;
