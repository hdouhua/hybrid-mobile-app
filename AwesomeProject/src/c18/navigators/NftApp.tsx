import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Page} from '../screens/Page';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export default function NftAppNavigator() {
  return (
    <Stack.Navigator initialRouteName="BottomTabHome">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTabHome"
        component={BottomTabHome}
      />
      <Stack.Screen name="Page" component={Page} />
    </Stack.Navigator>
  );
}

function BottomTabHome() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={TopTabHome}
        options={{
          title: '首页',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Page}
        options={{
          title: '消息',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={Page}
        options={{
          title: '我',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="engineering" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TopTabHome() {
  return (
    <TopTab.Navigator initialRouteName="TopTabDiscover">
      <TopTab.Screen name="Follow" component={Page} options={{title: '关注'}} />
      <TopTab.Screen
        name="TopTabDiscover"
        component={TopTabDiscover}
        options={{title: '发现'}}
      />
      <TopTab.Screen
        name="Location"
        component={Page}
        options={{title: '附近'}}
      />
    </TopTab.Navigator>
  );
}

function TopTabDiscover() {
  return (
    <TopTab.Navigator initialRouteName="Recommend">
      <TopTab.Screen
        name="Recommend"
        component={Page}
        options={{title: '推荐'}}
      />
      <TopTab.Screen name="Cat" component={Page} options={{title: '猫猫'}} />
      <TopTab.Screen name="Dog" component={Page} options={{title: '狗狗'}} />
    </TopTab.Navigator>
  );
}
