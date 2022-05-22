import {faker} from '@faker-js/faker';
import {IconType, NFTPagingType, NFTType} from './PetApiTypes';

interface CatSearchItem {
  id: string;
  url: string;
  width: number;
  height: number;
}
type CatSearchResponse = CatSearchItem[];

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
    it =>
      ({
        id: it.id,
        title: faker.animal.cat(),
        image: it.url,
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
  const items: NFTType[] = data.map((it: CatSearchItem, index: number) => {
    return {
      id: `${it.id}_${pageParam.toString()}_${index.toString()}`,
      image: it.url,
      name: faker.animal.cat(),
      motto: faker.lorem.lines(1),
      liked: it.width,
    };
  });

  return {nextPageIndex: pageParam + 1, items};
}
