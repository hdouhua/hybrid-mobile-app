import {StyleSheet} from 'react-native';

const BlankSpace = 8;
const FontSize = 14;
const LineHeight = 20;
const VerticalSpace = 12;

export const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: BlankSpace,
    marginHorizontal: 1,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: '#0ca',
    marginBottom: VerticalSpace,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: FontSize,
    lineHeight: LineHeight,
    marginHorizontal: FontSize,
    marginBottom: VerticalSpace,
  },
  nameBox: {flexDirection: 'row', marginHorizontal: FontSize, marginBottom: 5},
  name: {flex: 1, fontSize: 12},
  liked: {fontSize: 12},
});
