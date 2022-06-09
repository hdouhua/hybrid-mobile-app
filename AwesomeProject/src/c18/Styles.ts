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
  listContainer: {
    flex: 1,
    backgroundColor: 'wheat',
  },
  iconStyle: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 12,
    color: 'darkgray',
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  detailImage: {
    width: width,
    height: (width * 4) / 5,
    marginVertical: 8,
    resizeMode: 'contain',
  },
  detailDesc: {
    alignSelf: 'flex-start',
    marginHorizontal: 15,
  },
  buyRect: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
});
