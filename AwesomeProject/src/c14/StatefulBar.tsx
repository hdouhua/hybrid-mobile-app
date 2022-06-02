/**
 * this is a comparing example to the component AnimatedBar
 */

import React, {useState} from 'react';
import {View, Text, Button, Dimensions} from 'react-native';

const {width: WindowWidth} = Dimensions.get('window');

export default function StatefulBar(): React.ReactElement {
  const [randomWidth, setRandomWidth] = useState(10);

  const style = {
    width: randomWidth,
  };

  console.debug('render StatefulBar');
  return (
    <View>
      <Text>Stateful Bar</Text>
      <View style={[{height: 30, backgroundColor: 'dodgerblue'}, style]} />
      <Button
        title="Variant"
        onPress={() => {
          setRandomWidth(Math.random() * WindowWidth);
        }}
      />
    </View>
  );
}
