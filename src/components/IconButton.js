import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';

export default class IconButton extends React.PureComponent {
  render() {
    const { style, size = 50, color, icon, ...rest } = this.props;
    var btnStyle = {
      borderWidth: 1,
      borderRadius: size/2,
      width: size,
      height: size,
      padding: 12,
      borderColor: color || '#33dba0',
      marginTop: 20
    };

    return (
      <TouchableOpacity style={[btnStyle, style]} activeOpacity={0.6}
        {...rest}>
        <Image source={icon}
          style={{
            tintColor: color || '#33dba0',
            width: '100%',
            height: '100%'
          }} />
      </TouchableOpacity>
    )
  }
}