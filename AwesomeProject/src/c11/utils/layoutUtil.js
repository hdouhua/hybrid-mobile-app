import {Dimensions} from 'react-native';
// import {LayoutProvider} from 'recyclerlistview';
import {WaterfallLayoutProvider} from '../lib/recyclerlistview/WaterfallLayoutProvider';

import {ViewTypes} from './constant';

function getWindowWidth() {
  return Dimensions.get('window').width;
}

export function getLayoutProvider() {
  let width = getWindowWidth();
  const layoutProvider = new WaterfallLayoutProvider(
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
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2;
          dim.height = (width * 9) / 32;
          break;
        case ViewTypes.FULL:
          dim.width = width / 2;
          dim.height = (width * 3) / 8;
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
