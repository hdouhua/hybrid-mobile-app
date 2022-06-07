/**
 * https://dog.ceo/dog-api/
 */

import {faker} from '@faker-js/faker';
import {PetType, PagingPetType, dogStore} from './pet-store';
import {waitForRandom} from '../utils/util';
import {reqApi} from '../utils/dataUtil';

interface DogApiRes {
  message: string[];
  status: string;
}

const TotalCount = dogStore.length;

export async function fetchRandomImages(count = 10) {
  const apis = [
    'https://dog.ceo/api/breed/shiba/images',
    'https://dog.ceo/api/breed/husky/images',
  ];
  const dogs = await Promise.all(apis.map(it => reqApi<DogApiRes>(it))).then(
    (data: DogApiRes[]) => {
      return data
        .filter(it => it.status === 'success')
        .flatMap(it => it.message);
    },
  );

  await waitForRandom(100, 10);
  const index = Math.floor(Math.random() * 1000) % dogs.length;
  return dogs.slice(index, Math.min(dogs.length, index + count));
}

export async function fetchPetsByPaging({
  pageIndex = 0,
  pageSize = 25,
}): Promise<PagingPetType> {
  const startIndex =
    (Math.floor(Math.random() * 1000) % TotalCount) + pageIndex * pageSize;
  if (startIndex > TotalCount) {
    return {nextPageIndex: undefined, items: []};
  }

  await waitForRandom(200, 5);

  const items: PetType[] = dogStore
    .slice(startIndex, startIndex + pageSize)
    .map((it: string) => {
      return {
        id: faker.datatype.uuid(),
        image: it,
        name: faker.animal.dog(),
      };
    });

  return {nextPageIndex: pageIndex + 1, items};
}
