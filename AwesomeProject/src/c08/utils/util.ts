/**
 *
 */

export function generateArrayData(startIndex: number, count: number) {
  return new Array(count).fill(0).map((_, index) => ({
    title: `Item ${index + startIndex}`,
    id: index + startIndex,
  }));
}
