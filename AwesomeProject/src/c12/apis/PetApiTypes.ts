/**
 *
 */

export interface IconType {
  id: string;
  image: string;
  title: string;
}

export interface NFTType {
  id: string;
  image: string;
  name: string;
  motto: string;
  liked: number;
}

export interface NFTPagingType {
  items: NFTType[];
  nextPageIndex: number;
}
