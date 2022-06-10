import React from 'react';
import {useColorScheme} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NestingSampleNavigator from './NestingSample';
import ModalSampleNavigator from './ModalSample';
import SimpleAppNavigator from './SimpleApp';
import NftAppNavigator from './NftApp';
import {MyTheme} from './config';

const Drawer = createDrawerNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
      <Drawer.Navigator initialRouteName="ModalSample">
        <Drawer.Screen
          name="NestingSample"
          component={NestingSampleNavigator}
          options={{
            title: 'Nesting Sample',
            drawerIcon: ({color, size}) => (
              <MaterialIcons name="article" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="ModalSample"
          component={ModalSampleNavigator}
          options={{
            title: 'Modal Sample',
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
              <MaterialIcons name="more" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
