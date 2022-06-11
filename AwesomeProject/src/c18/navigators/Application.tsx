import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MyTheme} from './config';
import DrawerNavigator from './DrawerExample';
import {ModalStackGroup} from './ModalExample';

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
      <Stack.Navigator
        initialRouteName="AppDrawer"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AppDrawer" component={DrawerNavigator} />
        {ModalStackGroup()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
