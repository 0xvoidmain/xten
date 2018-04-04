import React, { Component } from 'react';
import { TabNavigator, DrawerNavigator, StackNavigator } from 'react-navigation';
import { realm, Flow, User }from './models';
import Home from './screens/Home';
import words from './data';
import {View} from 'react-native';

// realm.write(() => {
//   realm.deleteAll();
// });

const flow = Flow.getInstance();
if (!flow) {
  realm.write(() => {
    realm.create('Flow', {
      message: 'Welcome to xTen English',
      action: Flow.ACTIONS.GET_START,
      wordsLearn: [],
      wordsPractice: [],
    });
    realm.create('User', {
      name: '',
      numberOfWordsPerDay: 4
    });
    words.forEach(e => realm.create('Word', {
      ...e,
      enLength: e.en.length,
      viLength: e.vi.length,
      level: Math.round(e.en.length / 4)
    }))
  });
}

class H extends Component {
  render() {
    return <View style={{backgroundColor: 'red', flex: 1}} />;
  }
}

export default Home;