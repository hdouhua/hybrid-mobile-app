import React from 'react';
import {View, Text, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackParamList} from '../navigators/config';
import {Styles} from '../Styles';

export function Detail({
  route,
  navigation,
}: NativeStackScreenProps<NativeStackParamList, 'Detail'>) {
  const {title, image} = route.params;

  // 点击按钮后，异步设置
  const handlePress = () => {
    navigation.setOptions({
      title: '<cute> ' + title,
    });
  };

  return (
    <View style={[Styles.detailContainer]}>
      <Text>{title}</Text>
      <Image source={{uri: image}} style={Styles.detailImage} />
      <Text onPress={handlePress}>Change Header title</Text>
    </View>
  );
}
