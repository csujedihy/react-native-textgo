'use strict';

import React, { Component } from 'react';
import MyNavigationBar from '../Components/MyNavigationBar';
import Users from '../Model/users';

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
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/actions';


/*
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
*/

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Main extends Component {
  constructor() {
    super();
    console.log("start to set state.")
    /*
    var contactsData = this._genRows();
    console.log("contactsData by _genRows: " + contactsData);
    if(typeof contactsData === 'undefined'){
      contactsData = [];
    };
    */
    this.state = {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
      //dataSource: ds.cloneWithRows(contactsData)
      dataSource: ds.cloneWithRows([])
    };
    this._genRows();
    console.log("main.js initial finished.")
  }


/*
    Contacts.checkPermission( (err, permission) => {
      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      if(permission === 'undefined'){
        Contacts.requestPermission( (err, permission) => {
          console.log("require permission");
        })
      }
      if(permission === 'authorized'){
        console.log("permission got");
      }
      if(permission === 'denied'){
        console.log("refused");
      }
    })
*/

    
  _genRows(){
    console.log("start to get contacts.")
    Contacts.getAll((err, contacts) => {
      console.log("contact callback get called.")
      if(err && err.type === 'permissionDenied'){
        console.log("permissionDenied");
        this.setState({dataSource: ds.cloneWithRows([])});
        return [];
      } else {
        console.log("permissionGranted");
        console.log("real contacts: ", contacts);
        this.setState({dataSource: ds.cloneWithRows(contacts)});
        //this.setState({dataSource: ds.cloneWithRows([])});
        return contacts;
      }
    });
  }

  rightButtonHandler() {
    //Users.signOut();
    this.props.actions.logOut();
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
              console.log(this.state.dataSource)
              return (
                <ListView
                  enableEmptySections={true}
                  dataSource={this.state.dataSource}
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
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
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


export default connect(reducer => ({
    isLoggedIn: reducer.user.isLoggedIn
  }),
  (dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(Main);

//export default Main;