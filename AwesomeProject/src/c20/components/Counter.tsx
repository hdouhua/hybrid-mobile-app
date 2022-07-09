import React from 'react';
import {Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@/c20/redux/store';
import {Styles} from '../Styles';

const Counter = () => {
  const {value} = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <Text style={Styles.text}>Count: {value}</Text>
      <Button
        title="Increment"
        onPress={() =>
          dispatch({
            type: 'COUNTER_INCREMENT',
          })
        }
      />
      <Button
        title="Reset"
        onPress={() =>
          dispatch({
            type: 'COUNTER_RESET',
          })
        }
      />
    </>
  );
};

export default Counter;
