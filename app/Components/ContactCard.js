'use strict';

import React, { Component } from 'react';
import Communications from 'react-native-communications';
import MyNavigationBar from './MyNavigationBar';

import {
  StyleSheet,
  TouchableHighlight,
  Navigator,
  View,
  Text
} from 'react-native';


class ContactCard extends Component {
  constructor(props) {
    super(props);
  }

leftButtonHandler(){
  this.props.navigator.pop();
}

  render(){
    console.log("push success!!");
    var {row} = this.props;
    
    const titleConfig = {
      title: row.givenName,
    };

    const leftButtonConfig = {
      title: 'Contacts',
      handler: this.leftButtonHandler.bind(this)
    };

    return (
      <View style={styles.container}>
        <MyNavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <TouchableHighlight underlayColor={'#f3f3f2'}
          onPress={() => Communications.phonecall(row.phoneNumbers[0].number, true) }>
          <View style={styles.rowContainer}>
            <View style={styles.rowDetailsContainer}>
              <Text style={styles.rowDetailsLine}>
                Name: {row.givenName}
              </Text>
              <Text style={styles.rowDetailsLine}>
                Phone: {(typeof row.phoneNumbers[0] === 'undefined') ? 0 : row.phoneNumbers[0].number}
              </Text>
              <Text style={styles.rowDetailsLine}>
                Label: {(typeof row.phoneNumbers[0] === 'undefined') ? 0 : row.phoneNumbers[0].label}
              </Text>
              <Text style={styles.rowDetailsLine}>
                Email: {(typeof row.emailAddresses[0] === 'undefined') ? 0 : row.emailAddresses[0].email}
              </Text>
              <View style={styles.separator}/>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
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
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});

export default ContactCard;