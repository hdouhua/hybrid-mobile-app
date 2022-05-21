import {faker} from '@faker-js/faker';

interface CatSearchItem {
  id: string;
  url: string;
  width: number;
  height: number;
}
type CatSearchResponse = CatSearchItem[];

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

const CatsUrl = 'https://api.thecatapi.com/v1/images/search';

export async function queryIcons(): Promise<IconType[]> {
  const url = `${CatsUrl}?${new URLSearchParams({
    limit: '25',
    page: '1',
    order: 'asc',
  })}`;
  console.debug(url);

  const data: CatSearchResponse = await fetch(url).then(res => res.json());

  return data.map(
    item =>
      ({
        id: item.id,
        title: faker.animal.cat(),
        image: item.url,
      } as IconType),
  );
}

export async function queryNfts({pageParam = 0}): Promise<NFTPagingType> {
  const url = `${CatsUrl}?${new URLSearchParams({
    limit: '20',
    page: pageParam.toString(),
    order: 'desc',
  })}`;
  console.debug(url);

  const data: CatSearchResponse = await fetch(url).then(res => res.json());
  const items: NFTType[] = data.map((item: CatSearchItem, index: number) => {
    return {
      id: `${item.id}_${pageParam.toString()}_${index.toString()}`,
      image: item.url,
      name: faker.animal.cat(),
      motto: faker.lorem.lines(1),
      liked: item.width,
    };
  });

  return {nextPageIndex: pageParam + 1, items};
}
