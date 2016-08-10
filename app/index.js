'use strict';

import React, { Component } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';

import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text
} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

Parse.serverURL = "https://z.proximac.org:1337/parse";
Parse.initialize('textgo', 'mytextgoapp');

class App extends Component {
  render() {
    return (
      <View style={styles.container} >
        <StatusBar backgroundColor='transparent' animated={true} translucent={true} barStyle="light-content"/>
        <Text>HELLO!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;
