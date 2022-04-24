import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function StateUpdate() {
  const [count, setCount] = useState(0);
  const [objCount, setObjCount] = useState({count: 0, count2: 0});

  const updateCount = (name, distance) => {
    setObjCount(c => ({
      ...c,
      [name]: c[name] + distance,
    }));
  };
  return (
    <View>
      <View style={Styles.stateUpdate}>
        <Text>update state - primitive values:</Text>
        <Button title="+" onPress={() => setCount(c => c + 1)} />
        <Text>{count}</Text>
        <Button title="-" onPress={() => setCount(c => c - 1)} />
      </View>

      <View style={[Styles.stateUpdate, Styles.wrong]}>
        <Text>update state - object: (in wrong way)</Text>
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

      <View style={Styles.stateUpdate}>
        <Text>update state - object:</Text>
        <Button title="+" onPress={() => updateCount('count', 1)} />
        <Text>{objCount.count}</Text>
        <Button title="-" onPress={() => updateCount('count', -1)} />
      </View>

      <View style={Styles.stateUpdate}>
        <Text>update state - object:</Text>
        <Button title="+" onPress={() => updateCount('count2', 1)} />
        <Text>{objCount.count2}</Text>
        <Button title="-" onPress={() => updateCount('count2', -1)} />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  stateUpdate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    marginBottom: 10,
  },
  wrong: {
    backgroundColor: 'pink',
  },
});
