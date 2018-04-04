import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class SubActionCard extends React.Component {
  render() {
    const { children, style, ...rest } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.6} style={[styles.touch, style]} {...rest}>
        <Text style={styles.text}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    backgroundColor: 'transparent',
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 20,
    paddingBottom: 10,
    alignSelf: 'flex-end'
  },
  text: {
    color: '#ebebeb',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right'
  }
})