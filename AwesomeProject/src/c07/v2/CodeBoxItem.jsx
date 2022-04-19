import React from 'react';
import {View, Text} from 'react-native';

import {Styles} from '../Styles';

function CodeBoxItem({code, shadow, index}) {
  console.debug(`rendering ... ${index}`);
  return (
    <View style={Styles.cv2_display}>
      <Text style={Styles.cv2_text}>{code}</Text>
      {shadow && <View style={Styles.cv2_shadows} />}
    </View>
  );
}

export default React.memo(CodeBoxItem);
