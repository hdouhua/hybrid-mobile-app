import React, {useMemo} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';

import {Styles} from '../Styles';

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
