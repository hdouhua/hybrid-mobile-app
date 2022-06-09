/**
 * configure of navigators
 */

import {NftType} from '../apis/cats';

// export interface DetailPageParams {
//   name: string;
//   image: string;
// }

export type NativeStackParamList = {
  ['Detail']: NftType;
};

// require("image file"): ImageSourcePropType
// export const CutePets: DetailPageParams[] = [
//   {
//     name: '豆花小可爱',
//     image: require('@asset/01.jpg'),
//   },
//   {
//     name: '豆豆旺财',
//     image: require('@asset/02.jpg'),
//   },
// ];
