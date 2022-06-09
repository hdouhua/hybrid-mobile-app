import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Discover} from '../screens/Discover';
import {Detail} from '../screens/Detail';

const Stack = createNativeStackNavigator();

export function Application() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenListeners={{
          state: e => {
            // Do something with the state
            console.debug('Stack.Navigator - state changed', e.data);
          },
        }}>
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen
          name="Detail"
          initialParams={{symbol: '$'}}
          options={{
            // headerBackButtonMenuEnabled: false,
            // headerBackTitle: 'my back',
            // headerBackTitleVisible: false,
            statusBarHidden: true,
            headerShown: false,
            // gestureEnabled: false,
            animation: 'slide_from_bottom',
            fullScreenGestureEnabled: true,
          }}
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
