import React, {useEffect, useState} from 'react';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import GridWithIndicator from '@shared/components/GridWithIndicator';
import {GridItemType} from '@shared/components/Grid';
import {queryNfts} from '../apis/cats';
import {Styles} from '../Styles';

const ROW = 3;
const COLUMN = 1;

export function Discover({navigation}: NativeStackScreenProps<ParamListBase>) {
  const [list, setList] = useState<GridItemType[]>([]);

  useEffect(() => {
    queryNfts().then(data => {
      const cats: GridItemType[] = data.map(
        it =>
          ({
            id: it.id,
            icon: it.image,
            text: it.name,
            onPress: () => {
              navigation.navigate('Detail', it);
            },
          } as GridItemType),
      );

      setList(cats);
    });
  }, [navigation]);

  return (
    <GridWithIndicator
      data={list}
      row={ROW}
      column={COLUMN}
      height={600}
      containerStyle={Styles.listContainer}
      iconStyle={Styles.listIconStyle}
      textStyle={Styles.listTextStyle}
    />
  );
}
