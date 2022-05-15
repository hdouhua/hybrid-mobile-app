import {Dimensions} from 'react-native';
import {LayoutProvider} from 'recyclerlistview';

import {ViewTypes, ITEM_HEIGHT} from './constant';

function getWindowWidth() {
  return Dimensions.get('window').width;
}

export function getLayoutProvider() {
  let width = getWindowWidth();
  const layoutProvider = new LayoutProvider(
    index => {
      if (index % 3 === 0) {
        return ViewTypes.FULL;
      } else if (index % 3 === 1) {
        return ViewTypes.HALF_LEFT;
      } else {
        return ViewTypes.HALF_RIGHT;
      }
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.HALF_LEFT:
          dim.width = width / 2 - 1;
          dim.height = ITEM_HEIGHT;
          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2 - 1;
          dim.height = ITEM_HEIGHT;
          break;
        case ViewTypes.FULL:
          dim.width = width;
          dim.height = 120;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

  // to prevent list flickering
  layoutProvider.shouldRefreshWithAnchoring = false;

  return layoutProvider;
}
