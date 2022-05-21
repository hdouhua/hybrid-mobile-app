import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 5,
  },
  iconStyle: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 12,
    color: '#636363',
  },
  indicatorBox: {
    flexDirection: 'row',
    height: 5,
    alignSelf: 'center',
    transform: [{translateY: -10}],
  },
  indicator: {
    height: 5,
    borderRadius: 5,
    marginHorizontal: 3,
    width: 8,
    backgroundColor: '#A9A9A9',
  },
  activeIndicator: {
    width: 12,
    backgroundColor: '#FF4C39',
  },
});
