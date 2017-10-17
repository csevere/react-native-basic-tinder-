import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; 
import reducers from './src/reducers'; 
import config from './config/config'; 
import firebase from 'firebase'; 


class App extends Component{
  componentWillMount(){
    var connection = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId
    };
    firebase.initializeApp(connection);

  
  }
  render(){
    return (
      <Provider store = {createStore(reducers)}>
        <View>
          <Text>Hello</Text> 
        </View>
      </Provider> 
  
    );

  }

};

export default App; 
