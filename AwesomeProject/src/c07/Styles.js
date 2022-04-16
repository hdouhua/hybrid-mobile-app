import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  safeView: {
    marginHorizontal: 30,
  },
  input: {
    width: 200,
    height: 30,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  txt: {
    fontSize: 16,
    color: 'blue',
    marginTop: 15,
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  newFormField: {
    marginTop: 30,
    paddingTop: 30,
    borderTopWidth: 3,
    borderColor: 'grey',
  },
  // verification code
  vcContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  vcHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '400',
  },
  vcInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  vcInputItem: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    width: 20,
    borderBottomWidth: 2,
    marginRight: 10,
  },
  vcNewCode: {
    fontSize: 22,
    fontWeight: '400',
    color: 'blue',
  },
});
