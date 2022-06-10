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
  // SimpleApp
  listContainer: {
    flex: 1,
    backgroundColor: 'papayawhip',
  },
  listIconStyle: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  listTextStyle: {
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
  detailBuyRect: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  detailPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  //
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomHalfModal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    backgroundColor: 'white',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  dialog: {
    width: '90%',
    maxWidth: 400,
    minHeight: 200,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 15,
  },
  text: {
    fontSize: 22,
    marginVertical: 10,
  },
});
