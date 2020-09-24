import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import moment from 'moment'
import { deviceWidth } from '../../appStyles';

const ExpandableView = (props) => {
  const [expanded] = useState(new Animated.Value(0));
  const [toogleVariable, settoogleVariable] = useState('Show More');

  const toggleView = () => {
    const expandedValue = JSON.stringify(expanded);
    if (expandedValue === "0") {
      Animated.timing(expanded, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false
      }).start(() => {
        settoogleVariable('Show Less')
      });
    } else {
      Animated.timing(expanded, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start(() => {
        settoogleVariable('Show More')
      });
    }
  }

  const Height = expanded.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 100]
  });
  return (
    <View style={{
      backgroundColor: '#fff',
      height: 'auto',
      width: deviceWidth * 0.92,
      alignSelf: 'center',
      marginVertical: 5,
      borderRadius: 8,
      overflow: 'hidden'
    }}>
      <View style={{
        paddingVertical: 5,
        borderBottomColor: "#d3d3d3",
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Avatar
          title={`${props.title}`.slice(0, 1).toUpperCase()}
          rounded
          size='medium'
          overlayContainerStyle={{ backgroundColor: props.index > 0 ? 'orange' : '#d3d3d3' }}
        />
        <View style={{ marginLeft: deviceWidth * 0.02 }}>
          <Text style={{ fontWeight: 'bold' }}>{props.title}</Text>
          <Text style={{ fontSize: 12, color: 'grey', opacity: 0.8 }}>{props.subtitle}</Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomColor: "#d3d3d3",
        borderBottomWidth: 1
      }}>
        <Icon name='calendar-today' color='#d3d3d3' size={16} />
        <Text style={{ color: '#d3d3d3' }}> Created: <Text style={{ color: '#000', fontSize: 12 }}>
          {moment(props.createdAt, ['Do MMM YYYY']).format('Do MMM YYYY')}</Text></Text>
      </View>
      <Animated.View style={{
        paddingVertical: 5,
        height: Height,
      }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='menu' color='#d3d3d3' size={16} />
            <Text>{props.longDescription}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='pages' color='#d3d3d3' size={16} />
            <Text>{props.description}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => toggleView()}
          hitSlop={{
            bottom: 20,
            left: 20,
            right: 20,
            top: 20
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: '#fff',
            bottom: 0,
            right: 0,
            left: 0
          }}>
          <Text style={{ fontSize: 12, color: '#d3d3d3' }}>
            {toogleVariable}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={{
        position: 'absolute',
        top: 5,
        right: 10,
        borderRadius: 10,
        backgroundColor: 'orange',
        paddingVertical: 2,
        paddingHorizontal: 18
      }}>
        <Text style={{ color: '#fff' }}>{props.status}</Text>
      </View>
    </View>
  );
}


export default ExpandableView;