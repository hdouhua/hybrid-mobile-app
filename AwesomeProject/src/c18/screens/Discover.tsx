import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/routers';
import GridWithIndicator from '@shared/components/GridWithIndicator';
import {GridItemType} from '@shared/components/Grid';
import {fetchPetsByPaging} from '@shared/apis/catApi';
import {DetailPageParams} from '../navigators/config';
import {Styles} from '../Styles';

const ROW = 2;
const COLUMN = 3;

export function Discover({navigation}: NativeStackScreenProps<ParamListBase>) {
  const [list, setList] = useState<GridItemType[]>([]);
  const height = 300;

  useEffect(() => {
    fetchPetsByPaging({pageSize: 20}).then(data => {
      const cats: GridItemType[] = data.items.map(
        it =>
          ({
            id: it.id,
            icon: it.image,
            text: it.name,
            onPress: () => {
              navigation.navigate('Detail', {
                title: it.name,
                image: it.image,
              } as DetailPageParams);
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
      height={height}
      iconStyle={Styles.iconStyle}
      textStyle={Styles.textStyle}
    />
  );
}
