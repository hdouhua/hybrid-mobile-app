import React from 'react';
import {View, Button} from 'react-native';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import BasicDemo from '../basic';
import MultiGestureDemo from '../multi-gesture-in-single-view';
import SwipeableDemo from '../swipe-to-delete';
import styles from '../styles';

const HomeScreen = ({navigation}: NativeStackScreenProps<ParamListBase>) => {
  return (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Button
        title="基础手势 "
        onPress={() => navigation.navigate('BasicDemo')}
      />
      <Button
        title="单视图冲突手势"
        onPress={() => navigation.navigate('MultiGestureDemo')}
      />
      <Button
        title="滑动删除"
        onPress={() => navigation.navigate('SwipeableDemo')}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        animation: 'slide_from_right',
        headerBackTitleVisible: false,
        // fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BasicDemo"
        component={BasicDemo}
        options={{title: '基础手势'}}
      />
      <Stack.Screen
        name="MultiGestureDemo"
        component={MultiGestureDemo}
        options={{title: '单视图冲突手势'}}
      />
      <Stack.Screen
        name="SwipeableDemo"
        component={SwipeableDemo}
        options={{title: '滑动删除'}}
      />
    </Stack.Navigator>
  );
};

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
