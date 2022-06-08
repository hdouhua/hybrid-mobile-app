import React, {useState} from 'react';
import {
  ScrollView,
  Dimensions,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import {styles} from './Styles';
import {queryIcons} from '../../apis/dogs';
import Grid, {GridItemType} from '@shared/components/Grid';
import {useWhyDidYouUpdate} from '@shared/hooks/useWhyDidYouUpdate';

export interface RecyclerIcons {
  icons: GridItemType[];
  width: number;
  height: number;
  type: string;
}

interface BannerProps {
  data: RecyclerIcons;
  row?: number;
  column?: number;
}

const Banner: React.FC<BannerProps> = ({data, row = 2, column = 5}) => {
  useWhyDidYouUpdate('Banner', {data, row, column});
  const [indicator, setIndicator] = useState(0);

  const {icons, height, width} = data;
  const wrapperStyle = {height, width};
  // inner_height = wrapper_height - container_vertical_padding - indicator_height
  const innerHeight = height - 5 * 2 - 10;
  const pageCount = Math.ceil(icons.length / (row * column));

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

  console.debug('render Banner');
  return (
    <View style={wrapperStyle}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        // onContentSizeChange={() => console.debug('size changed')}
        onMomentumScrollEnd={scrollEndHandler}>
        <Grid
          data={icons}
          row={row}
          column={column}
          height={innerHeight}
          iconStyle={styles.iconStyle}
          textStyle={styles.textStyle}
        />
      </ScrollView>
      <View style={styles.indicatorBox}>
        {[...Array(pageCount)].map((_, index) => (
          <View
            key={index}
            style={
              indicator === index
                ? [styles.indicator, styles.activeIndicator]
                : styles.indicator
            }
          />
        ))}
      </View>
    </View>
  );
};

export const queryRecyclerIcons = async (): Promise<RecyclerIcons> => {
  const data = await queryIcons();
  const icons: GridItemType[] = data?.map(icon => ({
    id: icon.id,
    icon: icon.image,
    text: icon.title,
    onPress: (_, index) => {
      console.debug('click:', index);
    },
  }));

  return {
    icons: icons ?? [],
    width: Dimensions.get('window').width,
    height: 200,
    type: 'ICONS',
  };
};

export default Banner;
