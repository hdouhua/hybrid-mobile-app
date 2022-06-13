import React, {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {routingInstrumentation} from '@shared/utils/monitoring';
import SimpleExample from '../screens/SimpleExample';
import PromiseExample from '../screens/PromiseExample';
import RenderExample from '../screens/RenderExample';
import NftApp from '../screens/NftApp';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useRef<NavigationContainerRef<any>>(null);

  return (
    <NavigationContainer
      ref={navigation}
      onReady={() => {
        // Register the navigation container with the instrumentation
        routingInstrumentation.value.registerNavigationContainer(navigation);
      }}>
      <Tab.Navigator
        initialRouteName="SimpleExample"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="SimpleExample"
          component={SimpleExample}
          options={{
            title: 'Simple Err',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="error" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PromiseExample"
          component={PromiseExample}
          options={{
            title: 'Promise Err',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="error-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="RenderExample"
          component={RenderExample}
          options={{
            title: 'Render Err',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="report-problem" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="NftApp"
          component={NftApp}
          options={{
            title: 'Perf',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="analytics" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
