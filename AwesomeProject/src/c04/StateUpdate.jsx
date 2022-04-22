import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

export default function StateUpdate() {
  const [count, setCount] = useState(0);
  const [objCount, setObjCount] = useState({count: 0});
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'lightgreen',
          marginBottom: 10,
        }}>
        <Text>update state - primitive values:</Text>
        <Button title="+" onPress={() => setCount(c => c + 1)} />
        <Text>{count}</Text>
        <Button title="-" onPress={() => setCount(c => c - 1)} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'pink',
          marginBottom: 10,
        }}>
        <Text>update state - object in wrong way:</Text>
        <Button
          title="+"
          onPress={() => {
            objCount.count++;
            setObjCount(objCount);
          }}
        />
        <Text>{objCount.count}</Text>
        <Button
          title="-"
          onPress={() => {
            objCount.count--;
            setObjCount(objCount);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'lightblue',
          marginBottom: 10,
        }}>
        <Text>update state - object:</Text>
        <Button
          title="+"
          onPress={() =>
            setObjCount(c => ({
              count: c.count + 1,
            }))
          }
        />
        <Text>{objCount.count}</Text>
        <Button
          title="-"
          onPress={() =>
            setObjCount(c => ({
              count: c.count - 1,
            }))
          }
        />
      </View>
    </View>
  );
}
