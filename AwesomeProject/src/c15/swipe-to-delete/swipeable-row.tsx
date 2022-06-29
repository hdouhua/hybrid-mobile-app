import React, {useRef} from 'react';
import {Animated, Text, View, Alert, Pressable} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import styles from '../styles';

type Props = {
  index: number;
  children: React.ReactNode;
};
type RefObject = {
  current: Swipeable | null;
};

//FIXME: will be fixed in the future, please refer to PR https://github.com/software-mansion/react-native-gesture-handler/pull/2105
function SwipeableRow({children}: Props, openingRef: RefObject) {
  const selfRef = useRef<Swipeable>(null);

  const willOpenHandler = () => {
    if (
      openingRef &&
      openingRef.current &&
      openingRef.current !== selfRef.current
    ) {
      openingRef.current.close();
    }
  };
  const openHandler = () => {
    if (openingRef) {
      openingRef.current = selfRef.current;
    }
  };
  const close = () => {
    selfRef.current?.close();
  };

  const renderLeftActions = (
    _progress: Animated.AnimatedInterpolation,
    drag: Animated.AnimatedInterpolation,
  ) => {
    const trans = drag.interpolate({
      //TODO: how to set these ranges ?
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Pressable style={styles.leftAction} onPress={close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          Archive
        </Animated.Text>
      </Pressable>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => {
    const ItemWidth = 75;
    const Colors = {
      cancel: '#C8C7CD',
      read: '#ffab00',
      delete: '#dd2c00',
    };
    const renderItem = (text: string, color: string, x: number) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
        extrapolate: 'clamp',
      });
      const pressHandler = () => {
        close();
        Alert.alert(text);
      };

      return (
        <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
          <RectButton
            style={[styles.rightAction, {backgroundColor: color}]}
            onPress={pressHandler}>
            <Text style={styles.actionText}>{text}</Text>
          </RectButton>
        </Animated.View>
      );
    };

    return (
      <View
        style={{
          width: ItemWidth * 3,
          flexDirection: 'row',
        }}>
        {renderItem('Hide', Colors.cancel, ItemWidth * 3)}
        {renderItem('Mark as Read', Colors.read, ItemWidth * 2)}
        {renderItem('Delete', Colors.delete, ItemWidth)}
      </View>
    );
  };

  return (
    <Swipeable
      ref={selfRef}
      friction={1.5}
      overshootFriction={12}
      leftThreshold={30}
      rightThreshold={50}
      onSwipeableWillOpen={willOpenHandler}
      onSwipeableOpen={openHandler}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default React.forwardRef<Swipeable, Props>(SwipeableRow);
