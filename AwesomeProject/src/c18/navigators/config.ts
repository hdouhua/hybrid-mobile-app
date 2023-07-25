/**
 * configure of navigators
 */

import {DefaultTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NftType} from '../apis/cats';

// export interface DetailScreenParams {
//   name: string;
//   image: string;
// }

export type DialogScreenParams = {
  title?: string;
  content?: string;
};

export type NativeStackParamList = {
  // Modal Example
  Home: DialogScreenParams;
  MyDialog: DialogScreenParams;
  MyModal: DialogScreenParams;
  MyModal2: DialogScreenParams;
  MyModal3: DialogScreenParams;
  MyModal4: DialogScreenParams;
  // Simple App
  Discover: DialogScreenParams;
  Detail: NftType;
};

export type DefaultNavigationProps<T extends keyof NativeStackParamList> =
  NativeStackScreenProps<NativeStackParamList, T>;

// require("image file"): ImageSourcePropType
// export const CutePets: DetailScreenParams[] = [
//   {
//     name: '豆花小可爱',
//     image: require('@asset/01.jpg'),
//   },
//   {
//     name: '豆豆旺财',
//     image: require('@asset/02.jpg'),
//   },
// ];

// https://reactnavigation.org/docs/themes
export const MyTheme = {
  // dark: false,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    // more colors ...
  },
};
