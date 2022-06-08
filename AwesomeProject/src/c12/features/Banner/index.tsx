import React from 'react';
import {Dimensions} from 'react-native';

import {styles} from './Styles';
import {queryIcons} from '../../apis/dogs';
import {GridItemType} from '@shared/components/Grid';
import Grid from '@shared/components/GridWithIndicator';
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
  const {icons, height, width} = data;

  console.debug('render Banner');
  return (
    <Grid
      data={icons}
      row={row}
      column={column}
      width={width}
      height={height}
      iconStyle={styles.iconStyle}
      textStyle={styles.textStyle}
    />
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
