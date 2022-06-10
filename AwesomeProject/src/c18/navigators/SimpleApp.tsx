import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Discover} from '../screens/Discover';
import {Detail} from '../screens/Detail';

const Stack = createNativeStackNavigator();

export default function SimpleAppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={{
        headerStyle: {backgroundColor: 'papayawhip'},
      }}
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
          animation: 'slide_from_bottom',
          // fullScreenGestureEnabled: true,
          gestureEnabled: true,
          // headerBackButtonMenuEnabled: false,
          // headerBackTitle: 'my back',
          // headerBackTitleVisible: false,
          headerShown: false,
          presentation: 'modal',
          // statusBarHidden: true,
        }}
        component={Detail}
      />
    </Stack.Navigator>
  );
}
