import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { deviceHeight, deviceWidth } from '../../appStyles';

const Header = (props) => {
  return (
    <View style={[{
      height: deviceHeight * 0.08,
      width: deviceWidth,
    }, props.headerStyle]}>{
        props.title &&
        <Text>{props.title}</Text>
      }
      {
        props.leftTitle &&
        <Text style={[{ alignSelf: 'flex-start' }, props.leftTitleStyle]}>{props.leftTitle}</Text>
      }
      {
        props.rightTitle &&
        <Text>{props.rightTitle}</Text>
      }
      {
        props.rightComponent &&
        props.rightComponent()
      }
    </View>
  );
}


export default Header;