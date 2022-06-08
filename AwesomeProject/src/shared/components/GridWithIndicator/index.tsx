import React, {useState} from 'react';
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';
import Grid, {GridProps} from '../Grid';

interface GridWithIndicatorProps extends GridProps {
  containerStyle?: StyleProp<ViewStyle>;
  inactiveIndicatorStyle?: StyleProp<ViewStyle>;
  activeIndicatorStyle?: StyleProp<ViewStyle>;
}

const NewGrid = ({
  width = Dimensions.get('window').width,
  height = 200,
  containerStyle,
  inactiveIndicatorStyle,
  activeIndicatorStyle,
  ...props
}: GridWithIndicatorProps) => {
  const [indicator, setIndicator] = useState(0);

  // set default props
  if (props.data === undefined) {
    props.data = [];
  }
  if (props.row === undefined || props.column === undefined) {
    throw new Error('must set row && column');
  }

  const indicatorStyle = [Styles.indicator, inactiveIndicatorStyle];
  const indicatorStyle2 = [
    Styles.indicator,
    Styles.activeIndicator,
    activeIndicatorStyle,
  ];

  // container height - 2 * padding - indicator height
  const innerHeight = height - 5 * 2 - 10;
  const pageCount = Math.ceil(props.data.length / (props.row * props.column));

  const computedProps = {
    ...props,
    width,
    height: innerHeight,
  };

  const scrollEndHandler = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.debug('ScrollEnd', nativeEvent.contentOffset.x, indicator, width);
    const newIndicator = Math.floor(
      Math.round(nativeEvent.contentOffset.x) / Math.round(width),
    );
    if (newIndicator !== indicator) {
      setIndicator(newIndicator);
    }
  };

  console.debug('render NewGrid');
  return (
    <View style={containerStyle}>
      <ScrollView
        contentContainerStyle={Styles.scrollViewStyle}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={scrollEndHandler}>
        <Grid {...computedProps} />
      </ScrollView>
      <View style={Styles.indicatorBox}>
        {[...Array(pageCount)].map((_, index) => (
          <View
            key={index}
            style={indicator === index ? indicatorStyle2 : indicatorStyle}
          />
        ))}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  scrollViewStyle: {
    paddingVertical: 5,
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

export default NewGrid;
