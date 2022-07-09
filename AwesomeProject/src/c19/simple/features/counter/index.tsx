import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RootState, AppDispatch} from '../../redux/store';
import {counterSlice} from './counter-slice';

export default function Counter() {
  const {value} = useSelector((state: RootState) => state.counter);
  const dispath = useDispatch<AppDispatch>();

  const incrementHandler = () => {
    dispath(counterSlice.actions.increment());
  };

  const decrementHandler = () => {
    dispath(counterSlice.actions.decrement());
  };

  const resetHandler = () => {
    dispath(counterSlice.actions.reset());
  };

  setTimeout(() => console.debug('render Counter'), 1);
  return (
    <View
      style={{
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button title="-" onPress={decrementHandler} />
      <Text style={{width: 25, textAlign: 'center'}}>{value}</Text>
      <Button title="+" onPress={incrementHandler} />
      <Button title="Reset" onPress={resetHandler} />
    </View>
  );
}
