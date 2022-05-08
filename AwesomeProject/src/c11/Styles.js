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
  loadingLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loadingLayerIndicator: {
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius: 5,
  },
  footerWrapper: {
    height: 56,
    alignItems: 'stretch',
    margin: 10,
  },
  footerBtn: {
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerTxt: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
