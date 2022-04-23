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
  cvContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cvHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '400',
  },
  cvNewCode: {
    fontSize: 22,
    fontWeight: '400',
    color: 'blue',
  },
  // code verification v1
  cvInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  cvInputItem: {
    fontSize: 22,
    textAlign: 'center',
    width: 30,
    height: 45,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    marginRight: 10,
  },
  // code verification v2
  cv2_wrap: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
  },
  cv2_input: {
    position: 'absolute',
    width: 30,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    fontSize: 22,
  },
  cv2_display: {
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    width: 30,
    height: 45,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  cv2_text: {
    fontSize: 22,
  },
  cv2_shadows: {
    position: 'absolute',
    left: -4,
    top: -4,
    bottom: -4,
    right: -4,
    borderColor: 'lightblue',
    borderWidth: 4,
  },
  // code verification v3
  cv3_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: 262,
    marginLeft: 28,
    marginVertical: 15,
  },
  cv3_input: {
    fontSize: 22,
    letterSpacing: 28,
    marginHorizontal: 6,
  },
  cv3_lineContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  cv3_lineItem: {
    width: 30,
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
    marginRight: 10,
  },
});
