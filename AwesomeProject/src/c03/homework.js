import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const images = [
  'http://cdn.shopify.com/s/files/1/0550/4765/1389/articles/Cat_Yowling.jpg',
  'https://s36537.pcdn.co/wp-content/uploads/2017/12/A-cat-yowling-or-making-a-sound-with-mouth-open.jpg.optimal.jpg',
  'https://cdn.shopify.com/s/files/1/1788/4235/files/PPF-BlogUpdate-Thumbs_0041_42_Cat-Stages.jpg',
  'https://dogshome.com/wp-content/uploads/2016/07/LDH-reasons-to-adopt-a-cat-1013425-Beatrix-featured.jpg',
  'https://www.purina.co.uk/sites/default/files/2020-12/Understanding%20Your%20Cat%27s%20Body%20LanguageHERO.jpg',
  'https://static.scientificamerican.com/sciam/cache/file/9CAE9C60-8BC5-4CA3-95C180EFACDD99FD_source.jpg',
];

function Item({uri, height}) {
  return (
    <View
      style={{
        width: '45%',
        height: height,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'red',
      }}>
      <Image style={styles.img} source={{uri: uri}} />
      <Text style={styles.txt}>kitty</Text>
    </View>
  );
}

export default function Homework() {
  return (
    <View style={styles.container}>
      {/* {images.map((value, index) => (
        <Item uri={value} height={120} key={`cat_${index}`} />
      ))} */}
      <Item uri={images[0]} height={100} />
      <Item uri={images[1]} height={120} />
      <Item uri={images[2]} height={120} />
      <Item uri={images[3]} height={130} />
      <Item uri={images[4]} height={100} />
      <Item uri={images[5]} height={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  item: {
    width: '45%',
    height: 120,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'red',
  },
  img: {
    height: '80%',
  },
  txt: {
    textAlign: 'center',
  },
});
