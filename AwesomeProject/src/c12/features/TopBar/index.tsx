import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import NavItem, {NavItemType, NavItemPressHandler} from './NavItem';

const NAVS: NavItemType[] = [
  {
    name: '首页',
    id: 'HOME',
  },
  {
    name: '关注',
    id: 'FOLLOW',
  },
];

const TopBar: React.FC = () => {
  const [selectedNav, setSelectedNav] = useState(NAVS[0].id);

  const handlePress: NavItemPressHandler = id => setSelectedNav(id);

  return (
    <View style={styles.box}>
      {NAVS.map(it => (
        <NavItem
          key={it.id}
          id={it.id}
          active={it.id === selectedNav}
          onPress={handlePress}>
          {it.name}
        </NavItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default TopBar;
