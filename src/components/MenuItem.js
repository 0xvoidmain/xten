import React from 'react';
import {
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

export default class MenuItem extends React.PureComponent {
  render() {
    const { style, iconStyle, icon, textStyle, ...rest } = this.props;
    return (
      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.07)" onPress={() => { }}
        style={[{ height: 50, paddingLeft: 15, paddingRight: 10}, style ]}
        {...rest}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <Image source={icon}
            style={[{
              width: 20,
              height: 20,
              tintColor: '#01b5cc'
            },
              iconStyle
            ]} />
          <Text style={[{
            marginLeft: 12,
            fontSize: 17,
            color: '#333'
          },
            textStyle
          ]}>{this.props.children}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}