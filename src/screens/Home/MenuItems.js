import React, { Component } from 'react';
import {
  View
} from 'react-native';
import MenuItem from '../../components/MenuItem';

export default class Items extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
      isHiddenStatusBar: false
    }
  }

  render() {
    return <View>
      <MenuItem
        icon={{uri: 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/p320x320/17629850_1266970743371602_2103496356104478674_n.jpg?oh=687e529ebc5c5e0db9c36444e0a3355a&oe=5A08B666'}}
        iconStyle={{
          tintColor: undefined,
          width: 40,
          height: 40,
          borderRadius: 20
        }}
        style={{
          height: 70,
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 22,
          fontWeight: '300'
        }}>
        Tung Hoang
      </MenuItem>
      <MenuItem
        icon={require('../../resources/pie-chart.png')}
        iconStyle={{tintColor: 'forestgreen'}}>Progress</MenuItem>
      <MenuItem
        icon={require('../../resources/clock.png')}
        iconStyle={{tintColor: 'darkorange'}}>History</MenuItem>
      <MenuItem
        icon={require('../../resources/gift.png')}
        iconStyle={{tintColor: 'orangered'}}>Gift code</MenuItem>
      <MenuItem
        icon={require('../../resources/paper-plane.png')}
        iconStyle={{tintColor: '#01b5cc'}}>Share app</MenuItem>
      <MenuItem
        icon={require('../../resources/settings.png')}
        iconStyle={{tintColor: 'dodgerblue'}}>Setting</MenuItem>
    </View>
  }
}