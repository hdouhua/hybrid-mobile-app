import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    // debug
    // borderWidth: 1,
    // borderColor: 'red',
  },
  itemWrapper: {
    flex: 1,
    backgroundColor: 'lightgrey',
    margin: 3,
  },
  img: {
    flex: 1,
  },
  footerWrapper: {
    height: 56,
    alignItems: 'stretch',
    margin: 10,
  },
  footerTxt: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
