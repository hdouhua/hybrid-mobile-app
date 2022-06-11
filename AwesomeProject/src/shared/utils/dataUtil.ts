/**
 *
 */
import {FETCH_BATCH_SIZE, FETCH_DATA_SIZE} from './constant';
import {waitForRandom} from './util';

export interface Item {
  id: number;
  title: string;
}

export function generateMockData(startIndex: number, count: number): Item[] {
  return new Array(count).fill(0).map((_, index) => ({
    title: `Item ${index + startIndex}`,
    id: index + startIndex,
  }));
}

export async function fetchMockData(index: number) {
  await waitForRandom(300, 10);
  let result: Item[] | null = null;
  if (index < FETCH_DATA_SIZE) {
    result = generateMockData(index, FETCH_BATCH_SIZE);
  }
  return result;
}

export async function reqApi<T>(url: string): Promise<T> {
  return await fetch(url).then(res => res.json());
}

//#region mock
// mock network error fetch
export async function fetchWithNetworkError() {
  return await reqApi<string[]>('https://pets.ceo');
}
// mock rejection fetch
export async function fetchWithRejectionError() {
  return new Promise(() => {
    // reject('something wrong with fetching');
    throw new Error('something wrong with fetching');
  });
}
//#endregion
