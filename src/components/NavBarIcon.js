import React from 'react';
import { Image } from 'react-native';

export default class NavBarIcon extends React.PureComponent {
  render() {
    var { tintColor, source } = this.props;
    return (
      <Image source={source} style={{
        tintColor: tintColor,
        width: 25,
        height: 25
      }} />
    );
  }
}