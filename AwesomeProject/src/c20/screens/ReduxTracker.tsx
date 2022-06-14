import React from 'react';
import {View} from 'react-native';

import Counter from '../components/Counter';
import {Styles} from '../Styles';

const ReduxScreen = () => {
  return (
    <View style={Styles.contentContainer}>
      <Counter />
    </View>
  );
};

export default ReduxScreen;
