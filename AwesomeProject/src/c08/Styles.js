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
