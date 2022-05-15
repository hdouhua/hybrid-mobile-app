/**
 *
 */
import {FETCH_BATCH_SIZE, FETCH_DATA_SIZE} from './constant';

interface Item {
  id: number;
  title: string;
}

export function generateArrayData(startIndex: number, count: number): Item[] {
  return new Array(count).fill(0).map((_, index) => ({
    title: `Item ${index + startIndex}`,
    id: index + startIndex,
  }));
}

export function fetchData(index: number) {
  return new Promise<Item[] | null>(resolve => {
    const waitingFor = 300 * Math.floor(((Math.random() * 100) % 10) + 1);
    setTimeout(() => {
      let result: Item[] | null = null;
      if (index < FETCH_DATA_SIZE) {
        result = generateArrayData(index, FETCH_BATCH_SIZE);
      }
      resolve(result);
    }, waitingFor);
  });
}

// API: https://dog.ceo/dog-api/
export async function fetchDogs(index: number) {
  const apis = [
    'https://dog.ceo/api/breed/shiba/images',
    'https://dog.ceo/api/breed/husky/images',
  ];
  const dogs: Array<string> = await Promise.all(
    apis.map(it => fetch(it).then(res => res.json())),
  ).then(data =>
    data.filter(it => it.status === 'success').flatMap(it => it.message),
  );

  let result: string[] | null = null;
  if (index < FETCH_DATA_SIZE && index < dogs.length) {
    result = dogs.slice(index, Math.min(dogs.length, index + FETCH_BATCH_SIZE));
  }

  // return result;
  // specially slow down fetch
  return new Promise(resolve => {
    const waitingFor = 200 * Math.floor(((Math.random() * 100) % 10) + 1);
    setTimeout(() => {
      resolve(result);
    }, waitingFor);
  });
}
