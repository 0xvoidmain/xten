import React from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

export default class Button extends React.PureComponent {
  render() {
    const { style, textStyle, width, type, ...rest } = this.props;
    var btnStyle = {
      backgroundColor: type == 'outline'? 'transparent' : '#fff',
      borderRadius: 50,
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 10,
      paddingBottom: 10,
      width: width
    };

    if (type == 'outline') {
      btnStyle.borderWidth = 1;
      btnStyle.borderColor = '#fff';
    }
    return (
      <TouchableOpacity style={[btnStyle, style]}
        activeOpacity={0.8}
        {...rest}>
        <Text style={[{ color: type == 'outline' ? '#fff' : '#1fc88d', fontSize: 17, textAlign: 'center' }, textStyle]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    )
  }
}

