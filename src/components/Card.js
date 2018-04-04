import React from 'react';
import {
  View
} from 'react-native';

export default class Card extends React.PureComponent {
  render() {
    const { style, ...rest } = this.props;
    return (
    <View style={[{
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 4
    }, style]} {...rest}>
      {this.props.children}
    </View>
    );
  }
}