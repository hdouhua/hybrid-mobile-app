import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import {useQuery, useInfiniteQuery} from 'react-query';

import Loading from '@shared/components/Loading';
import NoData from '@shared/components/NoData';
import Banner, {queryRecyclerIcons, RecyclerIcons} from '../Banner';
import WaterFallCard, {
  queryRecyclerNfts,
  RecyclerNFT,
  RecyclerNFTs,
  recyclerQueryOption,
} from '../WaterfallCard';

const List = () => {
  const {
    data: recyclerIcons,
    isLoading,
    isError,
  } = useQuery<RecyclerIcons>('queryRecyclerIcons', queryRecyclerIcons);

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<RecyclerNFTs>(
    'queryRecyclerNfts',
    queryRecyclerNfts,
    recyclerQueryOption,
  );

  const Footer = () => {
    console.debug('render Footer');
    return (
      <View style={styles.footer}>
        {!hasNextPage && <Text>没有数据了</Text>}
        {(isFetching || isFetchingNextPage) && <Text>获取数据中...</Text>}
      </View>
    );
  };

  if (status === 'error' || isError) {
    return <Text>服务跑丢了</Text>;
  }

  if (status === 'loading' || isLoading) {
    return <Text>努力加载中...</Text>;
  }

  const recyclerNfts =
    data && data.pages ? data.pages.flatMap(group => group.items) : [];

  console.debug('render List', recyclerNfts.length);
  return (
    <View style={styles.container}>
      <MasonryList
        data={recyclerNfts}
        keyExtractor={(item: RecyclerNFT): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        loading={isFetchingNextPage || isFetching}
        renderItem={({item}) => <WaterFallCard item={item} />}
        onEndReachedThreshold={0.1}
        onEndReached={() =>
          hasNextPage && !(isFetching || isFetchingNextPage) && fetchNextPage()
        }
        LoadingView={<Loading color="red" />}
        ListHeaderComponent={
          recyclerIcons && <Banner data={recyclerIcons} column={4} />
        }
        ListEmptyComponent={<NoData />}
        ListFooterComponent={Footer()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffcc'},
  liked: {fontSize: 12},
  footer: {
    height: 50,
    lineHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default List;
