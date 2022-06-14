import React, {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {routingInstrumentation} from '@shared/utils/monitoring';
import ErrorTracker from './ErrorTracker';
import ReduxTracker from '../screens/ReduxTracker';
import PerfTracker from '../screens/PerfTracker';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useRef<NavigationContainerRef<any>>(null);

  return (
    <NavigationContainer
      ref={navigation}
      // onStateChange={state => {
      //   console.debug('New state is', state);
      // }}
      onReady={() => {
        // Register the navigation container with the instrumentation
        routingInstrumentation.value.registerNavigationContainer(navigation);
      }}>
      <Tab.Navigator
        initialRouteName="ErrorTracker"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="ErrorTracker"
          component={ErrorTracker}
          options={{
            title: 'Error Tracker',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="error" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ReduxTracker"
          component={ReduxTracker}
          options={{
            title: 'Redux Tracker',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="analytics" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PerfTracker"
          component={PerfTracker}
          options={{
            title: 'Perf Tracker',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="insights" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
