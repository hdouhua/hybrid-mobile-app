import {faker} from '@faker-js/faker';
import {dogStore} from './pet-store';
import {IconType, NFTPagingType, NFTType} from './PetApiTypes';

const IconsPageSize = 25;
const NftsPageSize = 20;

const TotalCount = dogStore.length;

export async function queryIcons(): Promise<IconType[]> {
  const startIndex = Math.floor(Math.random() * 1000) % TotalCount;
  if (startIndex > TotalCount) {
    return [];
  }

  const data = await new Promise<string[]>(resolve => {
    const waitFor = (Math.floor(Math.random() * 100) % 5) * 200;
    setTimeout(() => {
      resolve(dogStore.slice(startIndex, startIndex + IconsPageSize));
    }, waitFor);
  });

  return data.map(
    it =>
      ({
        id: faker.datatype.uuid(),
        title: faker.animal.dog(),
        image: it,
      } as IconType),
  );
}

export async function queryNfts({pageParam = 0}): Promise<NFTPagingType> {
  const startIndex =
    (Math.floor(Math.random() * 1000) % TotalCount) + pageParam * NftsPageSize;
  if (startIndex > TotalCount) {
    return {nextPageIndex: undefined, items: []};
  }

  const data = await new Promise<string[]>(resolve => {
    const waitFor = (Math.floor(Math.random() * 100) % 5) * 200;
    setTimeout(() => {
      resolve(dogStore.slice(startIndex, startIndex + NftsPageSize));
    }, waitFor);
  });

  const items: NFTType[] = data.map((it: string, index: number) => {
    return {
      id: faker.datatype.uuid(),
      image: it,
      name: faker.animal.dog(),
      motto: faker.lorem.lines(1),
      liked: index * Math.round(Math.random() * 1000),
    };
  });

  return {nextPageIndex: pageParam + 1, items};
}
