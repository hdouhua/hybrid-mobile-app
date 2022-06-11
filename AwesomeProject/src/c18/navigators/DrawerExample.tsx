import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NestingExampleNavigator from './NestingExample';
import ModalExampleNavigator from './ModalExample';
import SimpleAppNavigator from './SimpleApp';
import NftAppNavigator from './NftApp';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="ModalSample">
      <Drawer.Screen
        name="NestingExample"
        component={NestingExampleNavigator}
        options={{
          title: 'Nesting Example',
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="lightbulb-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ModalExample"
        component={ModalExampleNavigator}
        options={{
          title: 'Modal Example',
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="lightbulb" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="SimpleApp"
        component={SimpleAppNavigator}
        options={{
          title: 'Simple App',
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="done" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="NftApp"
        component={NftAppNavigator}
        options={{
          title: 'NTF App',
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="done-all" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
