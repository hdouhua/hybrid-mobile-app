import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';

const images = [
  require('@asset/cat_01.jpg'),
  require('@asset/cat_02.jpg'),
  require('@asset/cat_03.jpg'),
  require('@asset/cat_04.webp'),
  require('@asset/cat_05.webp'),
  require('@asset/cat_06.webp'),
  require('@asset/cat_07.jpg'),
  require('@asset/cat_08.webp'),
];

function Item({uri, height}) {
  let computedStyle = [styles.img, height ? {height} : {}];
  return (
    <View style={styles.item}>
      <Image style={[styles.img, computedStyle]} source={uri} />
      <Text style={styles.txt}>kitty</Text>
    </View>
  );
}

export default function Homework() {
  return (
    <View style={styles.container}>
      {images.map((value, index) => (
        <Item uri={value} key={index} />
      ))}
      <Item uri={images[0]} height={100} />
      <Item uri={images[1]} height={120} />
      <Item uri={images[2]} height={120} />
      <Item uri={images[3]} height={130} />
      <Item uri={images[4]} height={100} />
      <Item uri={images[5]} height={80} />
    </View>
  );
}

const winWidth = Dimensions.get('window').width;
const imgWidth = winWidth / 2 - 30;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  item: {
    width: winWidth * 0.45,
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
  },
  img: {
    // aspectRatio: 640 / 480,
    width: imgWidth,
    height: (imgWidth * 3) / 4,
    resizeMode: 'contain',
  },
  txt: {
    fontSize: 16,
  },
});
