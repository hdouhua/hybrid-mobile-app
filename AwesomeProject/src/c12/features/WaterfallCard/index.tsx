import React from 'react';
import {View, Text, Image} from 'react-native';
import {FetchInfiniteQueryOptions} from 'react-query';

import {queryNfts, NFTType, NFTPagingType} from '../../apis/home';
import {styles} from './Styles';

export interface RecyclerNFT extends NFTType {
  screenImageHeight: number;
  screenImageWidth: number;
  numberOfLines: number;
  likedStr: string;
  // width: number;
  // height: number;
  type: string;
}

export interface RecyclerNFTs extends NFTPagingType {
  items: RecyclerNFT[];
}

interface WaterFallProps {
  item: RecyclerNFT;
}

const WaterFallCard: React.FC<WaterFallProps> = ({item}) => {
  const {screenImageHeight, numberOfLines} = item;

  console.debug('render Card', item.id);
  return (
    <View style={styles.row}>
      <Image
        style={[
          styles.image,
          {
            height: screenImageHeight,
          },
        ]}
        source={{
          uri: item.image,
        }}
      />
      <Text numberOfLines={numberOfLines} style={styles.title}>
        {item.motto}
      </Text>
      <View style={styles.nameBox}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.liked}>❤{item.likedStr}</Text>
      </View>
    </View>
  );
};

export const recyclerQueryOption: FetchInfiniteQueryOptions<RecyclerNFTs> = {
  getNextPageParam: (lastPage, _) => {
    if (lastPage.nextPageIndex > 3) {
      // mock no-more-data
      return undefined;
    }
    return lastPage.nextPageIndex;
  },
};

export const queryRecyclerNfts = async ({pageParam = 0}) => {
  const data = await queryNfts({pageParam});

  const items = data.items.map((item: NFTType, index: number) => {
    // mock image size
    // const imageWidth = halfWindowWidth + ((index % 9) + 4);
    const screenImageHeight = ((index % 9) + 5) * 20 - index;

    const likedStr =
      item.liked < 1000
        ? item.liked.toString()
        : Math.round(item.liked / 1000).toString() + 'k';

    return {
      ...item,
      screenImageHeight,
      // screenImageWidth,
      numberOfLines: 2,
      likedStr,
      type: 'CARD',
    } as RecyclerNFT;
  });

  return {nextPageIndex: data.nextPageIndex, items} as RecyclerNFTs;
};

export default React.memo(WaterFallCard);
