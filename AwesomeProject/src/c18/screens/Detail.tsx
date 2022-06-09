/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useLayoutEffect} from 'react';
import {View, Text, Image, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackParamList} from '../navigators/config';
import {Styles} from '../Styles';

const ExchangeRate = 6.3;

export function Detail({
  route,
  navigation,
}: NativeStackScreenProps<NativeStackParamList, 'Detail'>) {
  const {name, image, description, price, symbol} = route.params;

  // // 与比较 useEffect， UX 更好
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //     fullScreenGestureEnabled: true,
  //   });
  // }, [navigation]);

  // 异步设置 navigation title
  const changeHeaderHandler = () => {
    navigation.setOptions({
      title: '<cute> ' + name,
    });
  };

  const buyHandler = () => {
    console.debug(`buy at price: ${symbol}${price}`);
  };

  const exchangeHandler = () => {
    if (symbol === '￥') {
      navigation.setParams({
        symbol: '$',
        price: Math.round((price / ExchangeRate) * 100) / 100,
      });
    } else {
      navigation.setParams({
        symbol: '￥',
        price: Math.round(price * ExchangeRate * 100) / 100,
      });
    }
  };

  return (
    <View style={[Styles.detailContainer]}>
      <Text>{name}</Text>
      {/* <Button onPress={changeHeaderHandler} title="Change Header" /> */}
      <Image source={{uri: image}} style={Styles.detailImage} />
      <Text style={Styles.detailDesc}>{description}</Text>
      <View style={Styles.buyRect}>
        <Text style={Styles.price}>
          {symbol}
          {price}
        </Text>
        <Button title="Exchange" onPress={exchangeHandler} />
        <Button title="Buy" onPress={buyHandler} />
      </View>
    </View>
  );
}
