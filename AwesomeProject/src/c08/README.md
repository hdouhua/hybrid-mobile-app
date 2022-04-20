# List: 高性能的无限列表

React Native 官方提供的列表组件是 `FlatList` ，但是更推荐使用开源社区提供的列表组件 `RecyclerListView` 。理由就是性能更好。

列表性能对于用户的直观感受就是是否卡顿。通常，评判列表卡顿的指标是 UI 线程的帧率和 JavaScript 线程的帧率。

FlastList 和 RecyclerListView 的底层实现都是组件 ScrollView 。

## ScrollView

ScrollView 是一个支持横向或竖向的滚动组件。

ScrollView 组件一次性直接渲染所有子视图，所有内容都会在首次刷新时进行渲染。内容很少的情况下当然无所谓，内容多起来了，速度便慢下来了。优化之一是懒加载，先渲染 N 个子视图。

>[参考](https://reactnative.dev/docs/scrollview)

## FlatList 列表组件 —— “自动”按需渲染

FlatList 组件底层使用的是虚拟列表 VirtualizedList ，VirtualizedList 底层组件使用的是 ScrollView 组件。因此 VirtualizedList 和 ScrollView 组件中的大部分属性，FlatList 组件也可以使用。

>[参考](https://reactnative.dev/docs/flatlist)

实现 FlatList 自动按需渲染的思路具体可以分为三步：

1. 通过滚动事件的回调参数，计算需要按需渲染的区域；

   滚动时会触发“异步”回调 onScroll 事件。

1. 通过需要按需渲染的区域，计算需要按需渲染的列表项索引；
  
   根据 UI 设计，获取列表项高度，以此计算按需渲染区域的高度，设置 getItemLayout 属性把列表项的高度提前告诉 FlastList。

   如果不能确定列表项的高度，也就是未知高度的列表项，FlastList 会启用列表项的布局回调函数 onLayout，在 onLayout 中会有大量的动态测量高度的计算，包括每个列表项的准确高度和整体的平均高度。

   实际生产中，如果你不填 getItemLayout 属性，也就是不把列表项的高度提前告诉 FlastList ，让 FlastList 通过 onLayout 的布局回调动态计算，用户是可以感觉到滑动**卡顿**。

1. 只渲染需要按需渲染列表项，不需要渲染的列表项用空视图代替。

   这个过程是顺滑的，表项是一个个渲染的，而不是 1 个屏幕或 10 个屏幕渲染的。

## RecyclerListView —— 可复用的列表组件

在首次渲染时，RecyclerListView 只会渲染首屏内容和用户即将看到的内容，所以它的首次渲染速度很快。在滚动渲染时，只会渲染屏幕内的和屏幕附近 250 像素的内容，距离屏幕太远的内容是空的。

这个组件的复用灵感来源于**原生**的可复用列表组件。比如，iOS 里的 `UITableView` 和 Android 里的动态列表 `RecyclerView` 。

>[参考](https://github.com/Flipkart/recyclerlistview)

### 复用机制

可以把列表比作 ArrayList ，把列表项类比成数组的元素。用户移动 ScrollView 时，相当于往 ArrayList 后面 push 新的元素对象，而 RecyclerListView 相当于把 ArrayList 的第一项挪到了最后一项中。挪动对象位置用到的计算资源少，也不用在内存中开辟一个新的空间。

### 使用

两个前提：

- 首先是列表项的宽高必须是确定的，或者是大致确定的；
- 第二是列表项的类型必须是可枚举的。

三个必填参数：

- 列表数据：dataProvider
- 列表项的布局方法：layoutProvider
- 列表项的渲染函数：rowRenderer

## 总结

### 从底层原理看

- ScrollView 内容的布局方式是从上到下依次排列的，**给多少内容，就会渲染多少内容**；
- FlatList 内容的布局方式还是从上到下依次排列的，它通过更新第一个和最后一个列表项的索引控制渲染区域，**默认渲染当前屏幕和上下 10 屏幕高度的内容**，其他地方用空白视图进行占位；
- RecyclerListView 性能最好，应该优先使用它，但使用它的**前提是列表项类型可枚举且高度确定或大致确定**。

### 从内存上看

- FlatList 要管理 21 个屏幕高度的内容 （怎么得出来的？）
- RecyclerListView 只要管理大概 1 个多点屏幕高度的内容，使用的内存肯定少。

### 计算量上看

- FlatList 要实时地销毁新建 Native 的 UI 视图
- RecyclerListView 只是改变 UI 视图的内容和位置，在 UI 主线程计算量肯定少。

![scrollview-flatlist](https://static001.geekbang.org/resource/image/e6/a0/e6cb77f6425810e752abbeb643dbb9a0.png?wh=1870x964)
