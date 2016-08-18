'use strict';

import React, { Component } from 'react';
import Communications from 'react-native-communications';
import TabBar from '../Components/TabBar';
import ContactCard from './ContactCard';
import MyNavigationBar from './MyNavigationBar';

import {
  View,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  ListView,
  Text
} from 'react-native';

class MainView extends Component{
  constructor(props) {
    console.log('MainView Constructor');
    super(props);
  }

  componentDidMount(){
    console.log("MainView componentDidMount.");
  }

  render(){
    const titleConfig = {
      title: 'Contacts',
    };

    console.log("MainView render/re-render.: " + this.props.testData);
    console.log("DataSource: " + (this.props.dataSource._dataBlob.s1.length? this.props.dataSource._dataBlob.s1[0].emailAddresses[0].email : "0"));
    return(
      <View style={styles.container}>
        <MyNavigationBar
          title={titleConfig}
        />
        <TabBar structure={[{
          title: 'Contacts',
          iconName: 'user',
          renderContent: () => {
            console.log("DataSource: " + (this.props.dataSource._dataBlob.s1.length? this.props.dataSource._dataBlob.s1[0].emailAddresses[0].email : "0"));
            return (
              <ListView
                enableEmptySections={true}
                dataSource={this.props.dataSource}
                renderRow={(row) => this.renderListViewRow.bind(this)(row, 'Contacts')}
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
                  dataSource={this.props.dataSource}
                  renderRow={(row) => this.renderListViewRow.bind(this)(row, 'Keypad') }
                />
              );
            }
          }
        ]}
        selectedTab={0}
        activeTintColor={'#ff8533'}
        iconSize={25}
      />
      </View>
    );
  }

  renderListViewRow(row, pushNavBarTitle) {
    console.log("MainView.js: renderListViewRow(), row: " + row.givenName);
    return (
      <TouchableHighlight 
        underlayColor={'#f3f3f2'}
        onPress={() => {return this.selectRow.bind(this)(row, pushNavBarTitle)}}>

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
    );
  }

  selectRow(row, pushNavBarTitle) {
    this.props.navigator.push({
      component: ContactCard,
      passProps: {
        row: row
      }
    })
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  navigator: {
    flex: 1,
    backgroundColor: '#F6F6EF',
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

export default MainView;