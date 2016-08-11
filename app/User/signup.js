'use strict';

import React, { Component } from 'react';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';
import TextField from 'react-native-md-textinput';


import {
  StyleSheet,
  StatusBar,
  UIManager,
  View,
  Text,
  Alert,
  Modal,
  ScrollView
} from 'react-native';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    console.log('SignUp Constructor' + props.visible);
    this.state = {modalVisible: this.props.visible};
  }
  componentDidMount() {
    this.setState({modalVisible: this.props.visible});
  }
  render() {
    console.log('Modal render()' + this.props.visible);
    return (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}>
          <View style={styles.container}>
            <ScrollView>
              <TextField label={'Email'} highlightColor={'#00BCD4'} />
              <TextField label={'Password'} highlightColor={'#00BCD4'} />
            </ScrollView>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flex: 1,
    flexDirection: 'column'
  }
});