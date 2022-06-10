import React from 'react';
import {View, Text, Button, Pressable} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackParamList} from '../navigators/config';
import {Styles as styles} from '../Styles';

export function HomeScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the home screen!</Text>
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
      <Button
        onPress={() => navigation.navigate('MyModal2')}
        title="Open card Modal"
      />
      <Button
        onPress={() => navigation.navigate('MyModal3')}
        title="Open contained Modal"
      />
      <Button
        onPress={() => navigation.navigate('MyModal4')}
        title="Open bottom half Modal"
      />
      <Button
        onPress={() =>
          navigation.navigate('MyDialog', {
            //title: 'BIG TITLE',
          })
        }
        title="Open Dialog"
      />
    </View>
  );
}

export function ModalScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a modal!</Text>
      <Button onPress={navigation.goBack} title="Dismiss" />
    </View>
  );
}

export function BottomModalScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase>) {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomHalfModal}>
        <Text style={styles.text}>This is a modal!</Text>
        <Button onPress={navigation.goBack} title="Dismiss" />
      </View>
    </View>
  );
}

export function DialogScreen({
  route,
  navigation,
}: NativeStackScreenProps<NativeStackParamList, 'MyDialog'>) {
  const {title, content} = route.params;

  return (
    <View style={styles.container}>
      <Pressable style={styles.backdrop} onPress={navigation.goBack} />
      <View style={styles.dialog}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalText}>{content}</Text>
      </View>
    </View>
  );
}
