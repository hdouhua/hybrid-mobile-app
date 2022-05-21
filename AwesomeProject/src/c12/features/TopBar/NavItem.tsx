import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

export type NavItemPressHandler = (id: string) => void;
export interface NavItemType {
  name: string;
  id: string;
}

interface NavItemProps {
  id: string;
  active?: boolean;
  children: string;
  onPress: NavItemPressHandler;
}

const NavItem: React.FC<NavItemProps> = ({active, onPress, id, children}) => {
  return (
    <Pressable onPress={() => onPress(id)}>
      <Text style={[styles.title, active && styles.activeFont]}>
        {children}
      </Text>
      {active && <View style={styles.activeBottomLine} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 20,
    fontSize: 14,
  },
  activeFont: {
    fontWeight: 'bold',
  },
  activeBottomLine: {
    marginTop: 2,
    height: 2,
    width: 28,
    backgroundColor: '#FF4C39',
    marginHorizontal: 20,
  },
});

export default NavItem;
