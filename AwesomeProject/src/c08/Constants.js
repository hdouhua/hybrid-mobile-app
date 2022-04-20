/**
 *
 */

const NUM_ITEMS = 100;
export const ITEM_HEIGHT = 100;

export const DATA = new Array(NUM_ITEMS).fill(0).map((_, index) => ({
  title: `Item ${index}`,
  id: index,
}));

export const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};
