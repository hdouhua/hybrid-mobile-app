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
    height: 90,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#f9c2ff',
    margin: 5,
  },
  itemWrapperLeft: {
    backgroundColor: '#ffbb00',
    borderColor: '#ffbb00',
  },
  itemWrapperRight: {
    backgroundColor: '#7cbb00',
    borderColor: '#7cbb00',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    opacity: 0.7,
  },
  footerWrapper: {
    alignItems: 'stretch',
    margin: 10,
  },
  footerBtn: {
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTxt: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '600',
  },
});
