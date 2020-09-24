import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { deviceHeight, deviceWidth } from '../../appStyles';


const TextInputComponent = (props) => {
  const onChangeText = (text) => {
    console.log(text);
    props.onChangeText(text);
  }

  return (
    <View style={[{
      height: deviceHeight * 0.04,
      width: deviceWidth * 0.92,
      alignSelf: 'center'
    }, props.style]}>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        value={props.value}
        style={{ flex: 1, padding: 0 }}
        placeholder='search by status ot title'
      />
      {props.rightComponent &&
        props.rightComponent()}
    </View>
  );
}


export default TextInputComponent;