import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  roundRect: {
    width: 200,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#FFF096',
    justifyContent: 'center',
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#A0D5EF',
    justifyContent: 'center',
  },
  txt: {
    alignSelf: 'center',
    fontWeight: '800',
    color: 'gray',
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: '#bbb',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  actionText: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
