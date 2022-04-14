import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  safeView: {
    marginHorizontal: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  basePressable: {
    width: 150,
    height: 50,
    backgroundColor: 'red',
  },
  rect: {
    margin: 10,
    borderWidth: 10,
    padding: 10,
    width: 100,
    height: 100,
    backgroundColor: 'orange',
  },
  baseText: {color: 'white', textAlign: 'center', lineHeight: 50},
});
