# 使用样式表 stylesheet

<p>
<img src="../../docs/c03.png" width="30%" />
</p>

## 组件的样式

组件样式 = 通用样式 + “私有”样式

![rn-style](https://static001.geekbang.org/resource/image/2d/9c/2d0dbe2764f676b3bac28330b7ba969c.jpg?wh=1920x1047)

## 弹性布局

![flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox/flex_terms.png)

**涉及的概念**
- 主轴 main-axis
- 交叉轴 cross-axis
- 容器属性 (container) 
   - display
   - flex-direction
   - flex-direction： column 是默认值，表示 y 轴是主轴
   - flex-wrap
   - justify-content 主轴上的对齐方式
      - space-between： 元素间等距分布，头尾元素顶着边框 (两端对齐)
      - space-around：元素均匀分布，元素之间的距离因为有右边距+左边距，所以间距是头尾元素距边框的 2X
      - space-evenly：完全等间距分布
   - align-items 交叉轴上的对齐方式 （当多行也就是允许 wrap，这就是每一行内的对齐方式）
      - baseline: 元素项按照他们的文字基线对齐。
      - stretch： (默认值) 拉伸元素以填充整个容器
   - align-content 当交叉轴上有剩余空间时，此项用于设置在交叉轴上如何分配剩余空间。（可能更好的理解是元素作为整体相对于容器的对齐方式。可以测试多行的效果，与 align-items 比较。）
- 元素属性 (item)
   - order：元素的顺序
   - align-self：
   - flex-grow 拉伸、flex-shrink 收缩、flex-basis 分配剩余空间的属性
   - flex

>[参考](https://chinese.freecodecamp.org/news/the-ultimate-guide-to-flexbox-learning-through-examples/)

## eslint issue

```
Inline style: xxxx eslint(react-native/no-inline-styles)
```

to fix, disable the rule `no-inline-styles` in the file [.eslintrc.js](../../.eslintrc.js)

```javascript
rules: {
  'react-native/no-inline-styles': 'off',
}
```

## 参考

- [iOS 布局性能大比拼](https://github.com/layoutBox/LayoutFrameworkBenchmark)
