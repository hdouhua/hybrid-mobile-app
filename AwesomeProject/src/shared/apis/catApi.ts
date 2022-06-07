/**
 * https://thecatapi.com/
 */

import {faker} from '@faker-js/faker';
import {reqApi} from '../utils/dataUtil';
import {PetType, PagingPetType} from './pet-store';

export interface CatSearchItem {
  id: string;
  url: string;
  width: number;
  height: number;
}
export type CatSearchRes = CatSearchItem[];

const CatsUrl = 'https://api.thecatapi.com/v1/images/search';

export async function fetchRandomImages(count = 10): Promise<string[]> {
  const url = `${CatsUrl}?${new URLSearchParams({
    limit: count.toString(),
    page: (Math.floor(Math.random() * 100) % 10).toString(),
    order: 'desc',
  })}`;
  console.debug(url);

  const cats = await reqApi<CatSearchRes>(url);
  return cats.flatMap(c => c.url);
}

export async function fetchByPaging({
  pageIndex = 0,
  pageSize = 25,
}): Promise<CatSearchRes> {
  const url = `${CatsUrl}?${new URLSearchParams({
    limit: pageSize.toString(),
    page: pageIndex.toString(),
    order: 'asc',
  })}`;
  console.debug(url);

  return await reqApi<CatSearchRes>(url);
}

export async function fetchPetsByPaging({
  pageIndex = 0,
  pageSize = 25,
}): Promise<PagingPetType> {
  const url = `${CatsUrl}?${new URLSearchParams({
    limit: pageSize.toString(),
    page: pageIndex.toString(),
    order: 'asc',
  })}`;
  console.debug(url);

  const data = await reqApi<CatSearchRes>(url);

  const items: PetType[] = data.map((it: CatSearchItem) => {
    return {
      id: faker.datatype.uuid(),
      image: it.url,
      name: faker.animal.cat(),
    };
  });

  return {nextPageIndex: pageIndex + 1, items};
}
