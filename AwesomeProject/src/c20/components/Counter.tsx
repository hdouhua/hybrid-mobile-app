import React from 'react';
import {Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@/c20/redux/store';
import {Styles} from '../Styles';

const Counter = () => {
  const {count} = useSelector((state: RootState) => state.Counter);
  const dispatch = useDispatch();

  return (
    <>
      <Text style={Styles.text}>Count: {count}</Text>
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
