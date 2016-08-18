'use strict';

import React, { Component } from 'react';
import MyNavigationBar from '../Components/MyNavigationBar';
import Users from '../Model/users';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
import TabBar from '../Components/TabBar';
import Contacts from 'react-native-contacts';
import Communications from 'react-native-communications';
import ContactCard from './ContactCard';
import MainView from './MainView';

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
  ListView,
  TouchableHighlight,
  Navigator,
} from 'react-native';


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Main extends Component {
  constructor() {
    super();
    console.log("start to set state.")
    this.state = {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
      dataSource: ds.cloneWithRows([]),
      testData: 0,
    };
    console.log("main.js initial finished.")
  }

  componentDidMount(){
    console.log("main.js: componentDidMount");
    this.genRows();
  }
    
  genRows(){
    Contacts.checkPermission( (err, permission) => {
      console.log("current permission: " + permission);
      if(permission === 'undefined' || permission === 'denied'){
        alert("Contacts not authorized! Please go to 'Settings'->'Privacy'->'Contacts' and grant permission.");
        Contacts.requestPermission( (err, permission) => {
          console.log("current permission: " + permission);
          console.log("require permission succeed");
        })
      }
    })

    console.log("start to get contacts.")
    Contacts.getAll((err, contacts) => {
      console.log("contact callback get called.")
      if(err && err.type === 'permissionDenied'){
        console.log("permissionDenied");
        this.setState({dataSource: ds.cloneWithRows([])});
        //return [];
      } else {
        console.log("permissionGranted");
        console.log("contacts: ", contacts);
        this.setState({dataSource: ds.cloneWithRows(contacts), testData: 1});
        console.log("main.js: this.setState() get called")
        //this.setState({dataSource: ds.cloneWithRows([])});
        //return contacts;
      }
    });
  }

  rightButtonHandler() {
    const {state, actions} = this.props;
    const {signOutAsync} = actions;
    signOutAsync();
  }

  configureScene(route, routeStack) {
    console.log("main.js: configureScene called")
    if (route.type == 'Bottom') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  renderScene(route, navigator) {
    console.log("main.js: renderScene called")
    //return <route.component navigator={navigator}  {...route.passProps} />;
    return (
      <route.component 
        navigator={navigator}  
        {...route.passProps}
        dataSource={this.state.dataSource}
      />
    );
  }

  render() {
    console.log("main.js: start render/re-render")
    const rightButtonConfig = {
      title: 'SIGN OUT',
      handler: this.rightButtonHandler.bind(this)
    };

    const titleConfig = {
      title: 'TXTGO',
    };
    var test = this.state.testData;
    return (
      <Navigator 
        //tintColor='#FF6600'
        initialRoute={
          {
            component: MainView,
            passProps: {
              dataSource: this.state.dataSource,
              testData: test
            }
          }
        }
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

}

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    //backgroundColor: '#F6F6EF',
  },
  container: {
    flex: 1,
    //backgroundColor: '#F6F6EF',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCount: {
    fontSize: 20,
    textAlign: 'right',
    color: 'gray',
    margin: 10,
    marginLeft: 15,
  },
  rowDetailsContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#FF6600'
  },
  rowDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
  listview: {
    marginBottom: 49
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});


export default connect(state => ({
    state: state.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(Main);
