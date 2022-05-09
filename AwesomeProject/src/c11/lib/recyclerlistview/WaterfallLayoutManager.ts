/***
 * Computes the positions and dimensions of items that will be rendered by the list. The output from this is utilized by viewability tracker to compute the
 * lists of visible/hidden item.
 */
import {
  Dimension,
  LayoutProvider,
  WrapGridLayoutManager,
  Layout,
} from 'recyclerlistview';

export class WaterfallLayoutManager extends WrapGridLayoutManager {
  constructor(
    layoutProvider: LayoutProvider,
    renderWindowSize: Dimension,
    isHorizontal = false,
    cachedLayouts?: Layout[],
  ) {
    super(layoutProvider, renderWindowSize, isHorizontal, cachedLayouts);
  }

  //TODO:Talha laziliy calculate in future revisions
  // startIndex：从第几个 item 开始有了更新，从这个 item 开始算，目的是为了减少计算量。默认：0
  // itemCount: 一共多个 item。
  // 以下注释只考虑垂直滚动，水平滚动同理。
  public relayoutFromIndex(startIndex: number, itemCount: number): void {
    // TODO: 性能优化
    // 每次都从头算，这样最简单。
    startIndex = 0;

    // 假设: 每个 item 的宽度为 1/2*window.width 两种情况
    const halfWindowWidth = this._window.width / 2;

    let startLeftY = 0; // 左边所有 item 的高度之和
    let startRightY = 0; // 右边所有 item 的高度之和

    let startX = 0; // 新增 item 的 X
    let startY = 0; // 新增 item 的 Y

    // 重新计算 scrollview 的高度
    this._totalHeight = 0;
    this._totalWidth = 0;

    const oldItemCount = this._layouts.length;
    // 初始化新 item 的宽高
    const itemDim = {height: 0, width: 0};
    let itemRect = null;
    let oldLayout = null;

    for (let i = startIndex; i < itemCount; i++) {
      // 旧 item 的layout（x/y/宽/高）
      oldLayout = this._layouts[i];
      // 调用 LayoutProvider 第一个入参函数
      // LayoutProvider( () => return 'type', fn2)
      const layoutType = this._layoutProvider.getLayoutTypeForIndex(i);
      // 在高度不确定的动态布局情况下，业务会开启 forceNonDeterministicRendering，此时 height、width 会计算两次，
      // 第一次取 LayoutProvider 第二个入参函数返回值（走 else），
      // 第二次 ViewRenderer _onViewContainerSizeChange 会调用 layoutManager 重写 height、width，这种情况下需要取重写的值。
      if (
        oldLayout &&
        oldLayout.isOverridden &&
        oldLayout.type === layoutType
      ) {
        itemDim.height = oldLayout.height;
      } else {
        // 调用 LayoutProvider 第二个入参函数，设置 itemDim
        // LayoutProvider(fn1,(type, itemDim, index) => { itemDim.height = 300;})
        this._layoutProvider.setComputedLayout(layoutType, itemDim, i);
      }
      itemDim.width = halfWindowWidth;

      // 保证一行中所有的 item 宽度之和不超过屏幕宽度，超过就换行
      if (startLeftY > startRightY) {
        startX = halfWindowWidth;
        startY = startRightY;
        startRightY += itemDim.height;
      } else {
        startX = 0;
        startY = startLeftY;
        startLeftY += itemDim.height;
      }

      // 如果是 item 是新增的，在添加新的 layout
      if (i > oldItemCount - 1) {
        this._layouts.push({
          x: startX,
          y: startY,
          height: itemDim.height,
          width: itemDim.width,
          type: layoutType,
        });
        // 如果是 item 是已经渲染过一次的，已经记住原有 layout，重新赋值
      } else {
        itemRect = this._layouts[i];
        itemRect.x = startX;
        itemRect.y = startY;
        itemRect.type = layoutType;
        itemRect.width = itemDim.width;
        itemRect.height = itemDim.height;
      }
    }
    // 如果 list 的长度减少了，也就是商品数量减少了，
    if (oldItemCount > itemCount) {
      this._layouts.splice(itemCount, oldItemCount - itemCount);
    }
    // 设置 scrollview 的最终高度
    this._totalHeight = Math.max(startLeftY, startRightY);
    this._totalWidth = this._window.width;
  }
}
