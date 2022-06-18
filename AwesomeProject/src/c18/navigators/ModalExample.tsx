import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  ModalScreen,
  BottomModalScreen,
  DialogScreen,
} from '../screens/ModalExamplePages';

const Stack = createNativeStackNavigator();

export default function ModalSampleNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Group>
      {/* {ModalStackGroup()} */}
    </Stack.Navigator>
  );
}

export function ModalStackGroup() {
  return (
    <Stack.Group
      screenOptions={{
        //animation: 'slide_from_bottom',
        headerShown: false,
        presentation: 'modal',
      }}>
      <Stack.Screen name="MyModal" component={ModalScreen} />
      <Stack.Screen
        name="MyModal2"
        component={ModalScreen}
        options={{
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="MyModal3"
        component={ModalScreen}
        options={{
          presentation: 'containedModal',
        }}
      />
      <Stack.Screen
        name="MyModal4"
        component={BottomModalScreen}
        options={{
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name="MyDialog"
        component={DialogScreen}
        initialParams={{
          title: 'Dialog Title',
          content: 'this is sample dialog content.',
        }}
        options={{
          animation: 'fade',
          presentation: 'transparentModal',
        }}
      />
    </Stack.Group>
  );
}
