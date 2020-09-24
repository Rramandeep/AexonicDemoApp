import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../app/screenOne/screenOne';
import screenThree from '../app/screenThree/screenThree';

const HEIGHT = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const Completed = () => {
  return (
    <View>
      <Text style={{ textAlign: 'center' }}>Hi there completed screen!</Text>
    </View>
  )
}

const Profile = () => {
  return (
    <View>
      <Text style={{ textAlign: 'center' }}>Hi there Profile screen!</Text>
    </View>
  )
}

function BottomTabsScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000',
        showLabel: false,
        tabStyle: {
          backgroundColor: '#f9f9f9',
          justifyContent: 'center',
        },
        style: {
          height: HEIGHT * 0.06,
        }
      }
      }      >
      <Tab.Screen
        name="ACTIVE"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='pages' size={17} color={focused ? 'orange' : 'grey'} />
                <Text style={{
                  fontSize: 13,
                  marginTop: 1,
                  fontWeight: 'bold',
                  color: focused ? 'orange' : 'grey'
                }}>
                  Active
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen name="Completed"
        component={Completed}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='check-circle-outline' size={17} color={focused ? 'orange' : 'grey'} />
                <Text style={{ fontSize: 13, marginTop: 1, fontWeight: 'bold', color: focused ? 'orange' : 'grey' }}>
                  Completed
                  </Text>
              </View>
            );
          }
        }}
      />
      <Tab.Screen name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='person' size={17} color={focused ? 'orange' : 'grey'} />
                <Text style={{ fontSize: 13, marginTop: 1, fontWeight: 'bold', color: focused ? 'orange' : 'grey' }}>
                  Profile
                  </Text>
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName='Home'
      >
        <HomeStack.Screen
          name="Home"
          component={BottomTabsScreen}
          options={{
            headerShown: false
          }}
        />
        <HomeStack.Screen
          name="MapScreen"
          component={screenThree}
          options={{
            headerShown: false
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer >
  )
};

export default Navigation;