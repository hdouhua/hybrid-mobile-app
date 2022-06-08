import React, {PureComponent, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text,
  Dimensions,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

type GridProps = {
  data: Array<GridItemType>;
  /**
   * number of rows in single screen, default is 2
   */
  row: number;
  /**
   * number of columns in single screen, default is 4
   */
  column: number;
  /**
   * container's width, default is window's width
   */
  width: number;
  /**
   * container's height, default is 150
   */
  height: number;
  /**
   * style setting of container's
   */
  style?: StyleProp<ViewStyle>;
  /**
   * style setting of each item
   */
  itemStyle?: StyleProp<ViewStyle>;
  /**
   * style setting of icon in item
   */
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * style setting of text in item
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * item render
   */
  renderItem?: (
    current: GridItemType,
    index: number,
    data: GridItemType[],
  ) => ReactNode;
};
export interface GridItemType {
  id: string;
  icon: string;
  text: string;
  onPress: (current: GridItemType, index: number) => void;
}

class Grid extends PureComponent<GridProps> {
  static defaultProps = {
    data: [],
    row: 2,
    column: 4,
    width: Dimensions.get('window').width,
    height: 150,
  };

  private handleItemPress(current: GridItemType, index: number) {
    return () => current.onPress(current, index);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderItem = (current: GridItemType, index: number, data: GridItemType[]) => {
    const {id, icon, text} = current;
    console.debug('render Grid:', id);
    const {
      itemStyle,
      iconStyle,
      textStyle,
      row,
      column,
      width: containerWidth,
      height: containerHeight,
    } = this.props;
    const width = Math.floor(containerWidth / column);
    const height = containerHeight / row;

    return (
      <TouchableHighlight
        key={id}
        activeOpacity={1}
        underlayColor={'#f5f5f5'}
        onPress={this.handleItemPress(current, index)}>
        <View style={[styles.item, {width, height}, itemStyle]}>
          {icon && (
            <Image style={[styles.icon, iconStyle]} source={{uri: icon}} />
          )}
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const {
      data,
      style,
      renderItem: render,
      row,
      column,
      width,
      height,
    } = this.props;
    const computedStyle = [styles.wrapper, {width, height}, style];
    const renderItem = render || this.renderItem;

    const chunks = [];
    for (let i = 0; i < data.length; i += row * column) {
      const chunk = data.slice(i, i + row * column);
      chunks.push(chunk.map((it, index) => renderItem(it, i + index, data)));
    }

    return (
      <>
        {chunks.map((it, index) => (
          <View key={index} style={computedStyle}>
            {it}
          </View>
        ))}
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 76 / 2,
    height: 76 / 2,
    marginBottom: 10 / 2,
  },
  text: {
    // set some default style
  },
});

export default React.memo(Grid);
