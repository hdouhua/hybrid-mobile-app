import React from 'react';
import {Button, Text, View, useColorScheme} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Styles as styles} from '../Styles';

export function DetailsScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate('HomeTab', {screen: 'Home'});
        }}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export function HomeScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export function SettingsScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      <Text>useColorScheme(): {colorScheme}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
