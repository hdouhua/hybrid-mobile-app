import React, {useRef} from 'react';
import {Text, View, FlatList} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';

import SwipeableRow from './swipeable-row';
import {DataRow, DATA} from './data';
import styles from '../styles';

export default function SwipeableDemo() {
  const openingRef = useRef<Swipeable>(null);

  const renderItem = ({item, index}: {item: DataRow; index: number}) => (
    <SwipeableRow index={index} ref={openingRef}>
      <RectButton style={styles.rectButton}>
        <Text style={styles.fromText}>{item.from}</Text>
        <Text numberOfLines={2} style={styles.messageText}>
          {item.message}
        </Text>
        <Text style={styles.dateText}>{item.when}</Text>
      </RectButton>
    </SwipeableRow>
  );

  return (
    <FlatList
      data={DATA}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}
