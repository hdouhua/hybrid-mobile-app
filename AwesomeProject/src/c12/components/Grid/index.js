import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

class Grid extends PureComponent {
  static propTypes = {
    /**
     * 传入的数据，包括 icon、文字、点击回调函数
     */
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        onPress: PropTypes.func,
      }),
    ),
    /**
     * 单屏 grid 的行数，默认是 2
     */
    row: PropTypes.number,
    /**
     * 单屏 grid 的列数，默认是 4
     */
    column: PropTypes.number,
    /**
     * 外部容器的宽度，默认是屏幕的宽度
     */
    width: PropTypes.number,
    /**
     * 外部容器的高度，默认是 150
     */
    height: PropTypes.number,
    /**
     * 外部容器的样式
     */
    style: ViewPropTypes.style,
    /**
     * 每个格子的样式
     */
    itemStyle: ViewPropTypes.style,
    /**
     * 格子 icon 的样式
     */
    iconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    /**
     * 格子 text 的样式
     */
    textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    /**
     * 自定义渲染每个格子的内容
     */
    renderItem: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    row: 2,
    column: 4,
    width: Dimensions.get('window').width,
    height: 150,
  };

  handleItemPress({icon, text, onPress}, index, data) {
    return () => onPress({icon, text}, index, data);
  }

  renderItem = ({id, icon, text, onPress}, index, data) => {
    console.debug('render grid item:', index);
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
        onPress={this.handleItemPress({icon, text, onPress}, index, data)}>
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
      let chunk = data.slice(i, i + row * column);
      chunks.push(chunk.map(renderItem));
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
