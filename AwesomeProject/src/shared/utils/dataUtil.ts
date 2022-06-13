/**
 *
 */
import {FETCH_BATCH_SIZE, FETCH_DATA_SIZE} from './constant';
import {waitForRandom} from './util';
import {startTransaction} from '@shared/utils/monitoring';

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

/**
 * xhr perf demo api
 * @param url {String}
 * @returns object {T}
 */
export async function reqApiPerf<T>(url: string): Promise<T> {
  const transaction = startTransaction({name: 'perf-test'});
  const span = transaction.startChild({
    op: 'http',
    description: `GET ${url}`,
  });

  return await fetch(url).then(async res => {
    const data = await res.text();
    const length = data.length;
    span.setTag('http.status_code', res.status);
    span.setTag('http.content_length', length);
    span.finish();
    transaction.finish();
    return JSON.parse(data);
  });
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
