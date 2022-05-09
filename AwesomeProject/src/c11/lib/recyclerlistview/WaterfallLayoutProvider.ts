import {
  LayoutManager,
  Layout,
  LayoutProvider,
  Dimension,
} from 'recyclerlistview';
import {WaterfallLayoutManager} from './WaterfallLayoutManager';

export class WaterfallLayoutProvider extends LayoutProvider {
  _lastLayoutManager: WaterfallLayoutManager | undefined;

  constructor(
    getLayoutTypeForIndex: (index: number) => string | number,
    setLayoutForType: (
      type: string | number,
      dim: Dimension,
      index: number,
    ) => void,
  ) {
    super(getLayoutTypeForIndex, setLayoutForType);
  }

  public newLayoutManager(
    renderWindowSize: Dimension,
    isHorizontal?: boolean,
    cachedLayouts?: Layout[],
  ): LayoutManager {
    this._lastLayoutManager = new WaterfallLayoutManager(
      this as unknown as LayoutProvider,
      renderWindowSize,
      isHorizontal,
      cachedLayouts,
    );
    return this._lastLayoutManager;
  }
}
