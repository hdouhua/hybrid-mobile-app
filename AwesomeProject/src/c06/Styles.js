import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  safeView: {
    marginHorizontal: 30,
    flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
  },
  basePressable: {
    width: 150,
    height: 50,
    marginTop: 10,
    backgroundColor: 'red',
    // flexDirection: 'column',
    alignItems: 'center',
  },
  rect: {
    margin: 10,
    borderWidth: 10,
    borderColor: 'blue',
    padding: 20,
    width: 150,
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {color: 'white', lineHeight: 50},
});
