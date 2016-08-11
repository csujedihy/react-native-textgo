'use strict';

import React, { Component } from 'react';

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
} from 'react-native';

import TabBar from '../Components/TabBar';
import Contacts from 'react-native-contacts';

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

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});  
allContacts =  ds.cloneWithRows([{	
			recordID: 1,
  			familyName: "Jung",
  			givenName: "Carl",
  			middleName: "",
  			emailAddresses: [{
    			label: "work",
    			email: "carl-jung@example.com",
  			}],
  			phoneNumbers: [{
    			label: "mobile",
    			number: "(555) 555-5555",
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

	_renderContent(text) {
		return (
			<View>
				<Text>{text}</Text>
			</View>
		);
	}


  renderListViewRow(row, pushNavBarTitle){
      return(
          <TouchableHighlight underlayColor={'#f3f3f2'}
                              onPress={()=>this.selectRow(row, pushNavBarTitle)}>
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
                        Email: {(typeof row.emailAddresses[0] === 'undefined')? 0 : row.emailAddresses[0].email}
                    </Text>
                    <View style={styles.separator}/>
                </View>
            </View>
          </TouchableHighlight>
      );
  }
	
  
	render() {
      return(
      <TabBar structure={[{
                            title: 'Contacts',
                            iconName: 'user',
                            renderContent: () => {return(
                            	<ListView
                            		dataSource={allContacts}
                            		renderRow={(row)=>this.renderListViewRow(row, 'Ask Story')}
								/>
                            );}
                          },
                          {
                            title: 'Keypad',
                            iconName: 'phone',
							renderContent: () => {return(
                            	<ListView
                            		dataSource={allContacts}
                            		renderRow={(row)=>this.renderListViewRow(row, 'Ask Story')}
								/>
                            );}
                          }
                          ]}
              selectedTab={2}
              activeTintColor={'#ff8533'}
              iconSize={25}
			  />
    );
  }
  

/* 
    render() {
        return (
					<TabBarIOS
						unselectedTintColor="yellow"
						tintColor="white"
						barTintColor="darkslateblue">

						<TabBarIOS.Item
							title="Messages"
							selected={this.state.selectedTab === 'redTab'}
							onPress={() => {
								this.setState({
									selectedTab: 'redTab',
								});
							}}>
							{this._renderContent('Red Tab')}
						</TabBarIOS.Item>

						<TabBarIOS.Item
							renderAsOriginal
							title="Dial"
							selected={this.state.selectedTab === 'greenTab'}
							onPress={() => {
								this.setState({
									selectedTab: 'greenTab',
								});
							}}>
							{this._renderContent('Green Tab')}
						</TabBarIOS.Item>
					</TabBarIOS>
					
				);
    }
	*/
}

var styles = StyleSheet.create({
    rowContainer:{
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
      marginBottom:49
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    } 
});

export default Main;