import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const Styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  debugContainer: {
    borderWidth: 1,
    borderColor: 'red',
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailImage: {
    width: width,
    height: (width * 4) / 5,
    marginVertical: 8,
    resizeMode: 'contain',
  },
  iconStyle: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 12,
    color: '#636363',
  },
});
