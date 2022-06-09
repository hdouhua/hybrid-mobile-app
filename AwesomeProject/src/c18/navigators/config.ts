/**
 * configure of navigators
 */

export interface DetailPageParams {
  title: string;
  image: string;
}
export type NativeStackParamList = {
  Detail: DetailPageParams;
};

// require("image file"): ImageSourcePropType
// export const CutePets: DetailPageParams[] = [
//   {
//     title: '豆花小可爱',
//     image: require('@asset/01.jpg'),
//   },
//   {
//     title: '豆豆旺财',
//     image: require('@asset/02.jpg'),
//   },
// ];
