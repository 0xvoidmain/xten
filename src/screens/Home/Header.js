import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Header extends Component {

  render() {
    return (
    <View style={styles.header}>
      {/* <TouchableOpacity onPress={this.props.onOpenMenu} style={{padding: 10}}>
        <Image source={require('../../resources/icon-menu.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity> */}
      {/*<TouchableOpacity onPress={this.props.onOpenModal} style={{padding: 10}}>
        <Image source={require('../../resources/icon-light.png')} style={{ width: 22, height: 22 }} />
      </TouchableOpacity>*/}
    </View>);
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10
  }
})