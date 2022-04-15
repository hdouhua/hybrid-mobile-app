import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  safeView: {
    marginHorizontal: 30,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  basePressable: {
    width: 150,
    height: 50,
    marginTop: 10,
    backgroundColor: 'red',
  },
  rect: {
    margin: 10,
    borderWidth: 10,
    borderColor: 'blue',
    padding: 20,
    width: 150,
    height: 100,
    backgroundColor: 'orange',
  },
  baseText: {color: 'white', textAlign: 'center', lineHeight: 50},
});
