'use strict';

import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';
import Users from '../Model/users';
import SignInView from './SignInView';

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

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    console.log('SignUp Constructor' + props.visible);
    this.state = {
      modalVisible: this.props.visible,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.setState({ modalVisible: this.props.visible });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modalVisible: nextProps.visible });
  }

  modalClose() {
    this.setState({ modalVisible: false });
  }

  configureScene(route, routeStack) {
    if (route.type == 'Bottom') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  renderScene(route, navigator) {
    return <route.component navigator={navigator}  {...route.passProps} />;
  }

  render() {
    console.log('Modal render()' + this.props.visible);
    var username = "";
    var password = "";

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => { alert("Modal has been closed.") } }>
        <Navigator
          style={styles.navigator}
          initialRoute={
            {
              component: SignInView,
              passProps: {
                modalClose: this.modalClose.bind(this)
              }
            }
          }
          configureScene={this.configureScene.bind(this)}
          renderScene={this.renderScene.bind(this)}
          />
      </Modal>
    );
  }
}

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