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
    let waitingFor = 300 * Math.floor(((Math.random() * 100) % 10) + 1);
    setTimeout(() => {
      let result: Item[] | null = null;
      if (index < FETCH_DATA_SIZE) {
        result = generateArrayData(index, FETCH_BATCH_SIZE);
      }
      resolve(result);
    }, waitingFor);
  });
}
