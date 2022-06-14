import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ErrorTrackerHome from '../screens/ErrorTracker';
import SimpleError from '../screens/SimpleExample';
import PromiseError from '../screens/PromiseExample';
import RenderError from '../screens/RenderExample';

const Stack = createNativeStackNavigator();

export default function ErrorTracker() {
  return (
    <Stack.Navigator
      initialRouteName="ErrorTrackerHome"
      screenOptions={{
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="ErrorTrackerHome"
        component={ErrorTrackerHome}
        options={{
          title: 'Error Tracker',
        }}
      />
      <Stack.Screen
        name="SimpleError"
        component={SimpleError}
        options={{
          title: 'Simple Error',
        }}
      />
      <Stack.Screen
        name="PromiseError"
        component={PromiseError}
        options={{
          title: 'Promise Error',
        }}
      />
      <Stack.Screen
        name="RenderError"
        component={RenderError}
        options={{
          title: 'Render Error',
        }}
      />
    </Stack.Navigator>
  );
}
