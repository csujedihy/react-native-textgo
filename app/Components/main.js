'use strict';

import React, { Component } from 'react';
import MyNavigationBar from '../Components/MyNavigationBar';
import Users from '../Model/users';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';

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

import TabBar from '../Components/TabBar';
import Contacts from 'react-native-contacts';
import Communications from 'react-native-communications';

var allContacts;
/*
Contacts.getAll((err, contacts) => {
  if(err && err.type === 'permissionDenied'){
    console.log("permissionDenied");
  }else{
    console.log("permissionGranted");
    allContacts = contacts;
  }
});
*/

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
allContacts = ds.cloneWithRows([{
  recordID: 1,
  familyName: "Huang",
  givenName: "Yi",
  middleName: "",
  emailAddresses: [{
    label: "work",
    email: "yihuang@email.tamu.edu",
  }],
  phoneNumbers: [{
    label: "mobile",
    number: "(469) 236-7525",
  }],
  thumbnailPath: "",
}]);


class Main extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    };
  }

  rightButtonHandler() {
    const {state, actions} = this.props;
    const {signOutAsync} = actions;
    signOutAsync();
  }

  render() {
    const rightButtonConfig = {
      title: 'SIGN OUT',
      handler: this.rightButtonHandler.bind(this)
    };

    const titleConfig = {
      title: 'TXTGO',
    };

    return (
      <View style={styles.container}>
        <MyNavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig} />
        <Navigator
          style={styles.container}
          tintColor='#FF6600'
          initialRoute={{ id: 'Dashboard' }}
          renderScene={(route, navigator) => this.navigatorRenderScene(route, navigator) }/>
      </View>

    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      default:
      case 'Dashboard':
        return (
          <TabBar structure={[{
            title: 'Contacts',
            iconName: 'user',
            renderContent: () => {
              return (
                <ListView
                  dataSource={allContacts}
                  renderRow={(row, route, navigator) => this.renderListViewRow(row, 'Contacts', route, navigator) }
                  />
              );
            }
          },
            {
              title: 'Keypad',
              iconName: 'phone',
              renderContent: () => {
                return (
                  <ListView
                    dataSource={allContacts}
                    renderRow={(row, route, navigator) => this.renderListViewRow(row, 'Keypad', route, navigator) }
                    />
                );
              }
            }
          ]}
            selectedTab={2}
            activeTintColor={'#ff8533'}
            iconSize={25}
            />
        );
    }
  }


  renderListViewRow(row, pushNavBarTitle, route, navigator) {
    return (
      <TouchableHighlight underlayColor={'#f3f3f2'}
        onPress={() => this.selectRow(row, pushNavBarTitle, route, navigator) }>
        <View style={styles.rowContainer}>
          <Text style={styles.rowCount}>
            {row.count}
          </Text>
          <View style={styles.rowDetailsContainer}>
            <Text style={styles.rowTitle}>
              {row.title}
            </Text>
            <Text style={styles.rowDetailsLine}>
              Name: {row.givenName}
            </Text>
            <Text style={styles.rowDetailsLine}>
              Phone: {row.phoneNumbers[0].number}
            </Text>
            <Text style={styles.rowDetailsLine}>
              Label: {row.phoneNumbers[0].label}
            </Text>
            <Text style={styles.rowDetailsLine}>
              Email: {(typeof row.emailAddresses[0] === 'undefined') ? 0 : row.emailAddresses[0].email}
            </Text>
            <View style={styles.separator}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  selectRow(row, pushNavBarTitle, route, navigator) {
    return Communications.phonecall(row.phoneNumbers[0].number, true);
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
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