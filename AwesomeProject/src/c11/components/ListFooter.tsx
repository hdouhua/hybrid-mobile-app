import React, {useMemo} from 'react';
import {View, ActivityIndicator, Pressable, Text} from 'react-native';

import {Styles} from '../Styles';

export function LoadMore({onRefetch}) {
  const footer = useMemo(() => {
    console.debug('in footer rendering');
    return (
      <View style={Styles.footerWrapper}>
        <Pressable style={Styles.footerBtn} onPress={onRefetch}>
          <Text style={Styles.footerTxt}>Load More...</Text>
        </Pressable>
      </View>
    );
  }, [onRefetch]);

  return footer;
}

export function LoadingIndicator({loading, noMore}) {
  const footer = useMemo(() => {
    console.debug('in footer rendering');
    return (
      <View style={Styles.footerWrapper}>
        {loading && (
          <ActivityIndicator
            style={{margin: 10}}
            size="large"
            color={'black'}
          />
        )}
        {!loading && noMore && (
          <Text style={Styles.footerTxt}>No more data</Text>
        )}
      </View>
    );
  }, [loading, noMore]);

  return footer;
}
