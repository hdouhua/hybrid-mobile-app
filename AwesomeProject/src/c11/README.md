# 瀑布流 —— 改进 RecyclerListView

<p>
<img src="../../docs/c11.jpg" width="22%" />
</p>

本节的主要任务：分析 RecyclerListView 组件的源码，实现双列/多列 瀑布流。(源码分析时可以借助工具 Flipper 跟踪调试)。

## 瀑布流布局

### 源码阅读

- 打开 [源码](../../node_modules/recyclerlistview)

- 为了方便调试，修改 [package.json](../../node_modules/recyclerlistview/package.json) main 指向 src 下

```json
{
  //"main": "dist/reactnative/index.js"
  "main": "src/index.ts",
}
```

- 重新启动 RN `npm start` ，根据错误提示简单修改可能的错误。

- 理解组件逻辑和修改代码

  >**在理解别人的组件代码时，利用 `UI/JSX = f(state, props)` 这个最基本 React/RN 原理，先找到实现 UI 的 JSX 部分，再找到 state、props，然后再理解逻辑 f 的部分。**


[RecyclerListView](https://github.com/Flipkart/recyclerlistview/blob/3.0.5/src/core/RecyclerListView.tsx)

- renderCompat 方法：实际就是类组件的 render 方法，它最外层是一个滚动组件 ScrollComponent ；
- _generateRenderStack 方法：循环了状态 state.renderStack ，生成了若干个 renderedItems ；
- _renderRowUsingMeta 方法：返回的是具体的 renderedItems ，也就是 ViewRenderer 容器元素。

```ts
public renderCompat(): JSX.Element {
  return (
    <ScrollComponent>
      {this._generateRenderStack()}
    </ScrollComponent>
  );
}
//==> NEXT
private _generateRenderStack(): Array<JSX.Element | null> {
  const renderedItems = [];
  for (const key in this.state.renderStack) {
    if (this.state.renderStack.hasOwnProperty(key)) {
      renderedItems.push(this._renderRowUsingMeta(this.state.renderStack[key]));
    }
  }
  return renderedItems;
}
//==> NEXT
private _renderRowUsingMeta(itemMeta: RenderStackItem): JSX.Element | null {
  const itemRect = (this._virtualRenderer.getLayoutManager() as LayoutManager).getLayouts()[dataIndex];
  return (
    <ViewRenderer
      data={data}
      layoutProvider={this.props.layoutProvider}
      childRenderer={this.props.rowRenderer}
      x={itemRect.x}
      y={itemRect.y}
      height={itemRect.height}
      width={itemRect.width}
      onItemLayout={this._onItemLayout}/>
  );
}
//==> NEXT: LayoutManager.getLayouts
```

[LayoutManager](https://github.com/Flipkart/recyclerlistview/blob/3.0.5/src/core/layoutmanager/LayoutManager.ts)

- getLayouts 方法
- relayoutFromIndex 方法: 经过一翻计算，计算出了实现单列布局的 x/y/height/width 值，然后把它们作为对象 push 到了 this._layouts 。  
   而 ViewRenderer 根据 this._layouts 把列表项，渲染到了指定的位置上。  
   要想实现双列瀑布流布局，就得理解和修改 relayoutFromIndex 方法。（ *暂时不知道怎么调用到 relayoutFromIndex* ）

```ts
//Return all computed layouts as an array, frequently called, you are expected to return a cached array. Don't compute here.
public abstract getLayouts(): Layout[];

//Recompute layouts from given index, compute heavy stuff should be here
public abstract relayoutFromIndex(startIndex: number, itemCount: number): void;
```

>WrapGridLayoutManager (a concrect LayoutManager) uses LayoutProvider  
>=> relayoutFromIndex compute layouts and set it to layoutProvider by layoutProvider.setComputedLayout()
>
>LayoutProvider uses WrapGridLayoutManager  
>=> set it to _lastLayoutManager

### 实现目标双列瀑布流算法

示意图

![duar-waterfall-list](https://static001.geekbang.org/resource/image/93/9c/938fbe382fc3438c4ee41ed01c8eab9c.png?wh=1920x548)

增加对组件 RecyclerListView 新布局方式（瀑布流）的扩展，即创建新的 LayoutProvider 及它使用的 LayoutManager，如下

```
lib
└── recyclerlistview
    ├── README.md
    ├── WaterfallLayoutManager.ts  -- 重点逻辑都在方法 relayoutFromIndex
    └── WaterfallLayoutProvider.ts
```

## 关于 npm 包的修改方式

1. 直接复制源码。缺点是后续升级 RecyclerListview 的版本会非常困难。
2. 在运行时进行修改。这种方法对源码的侵入性小，但每次升级前还是需要手动检查一下相关代码逻辑是否有变化。
3. 在编译时修改。借助 `patch-package` 即时修复第三方 npm 包的能力。

   `patch package` 的原理是先对修改进行保存，然后在每次安装 npm 包的时候把修改给注入进去。——也是侵入式的修改方式。

   关于 `patch package` 的使用：

   在修改完 node_modules 目录下的 RecyclerListview 的文件后，运行命令 `npx patch-package recyclerlistview`，将修改的代码以 patch 文件的形式进行保存。

   **如何共享 patch 给团队成员？** —— 放入源码管理，同时利用 npm postinstall 脚本命令注入这个 patch 。

   ```json
   // package.json
   {
     "scripts": {
       "postinstall": "patch-package"
     }
   }
   ```

（*个人觉得 运行时修改 和 编译时修改 表达不是很准确，目前还没有想到什么更好的表述方式。*）

在本节示例中，我的实践了 2 和 3，使用 2 修改了属性的访问属性为 protected ，使用 3 扩展了新布局。

[生成 patch 的 bash 脚本](./npm-patch.sh)

### 最佳实践

不建议使用第一种直接复制源码的方式。
优先考虑在运行时的修改方法，通常该方案改动最小、侵入性也最小。
如果运行时方案改不了，可以考虑有侵入性的编译时的 pathc-package 方案。

## 参考

- [recyclerlistview 3.05 源码](https://github.com/Flipkart/recyclerlistview/tree/3.0.5)
- [新版网格布局 gridlayoutprovider](https://github.com/muskeinsingh/recyclerlistview-gridlayoutprovider)
- [npm 脚本](https://docs.npmjs.com/cli/v8/using-npm/scripts)
