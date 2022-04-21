# 使用样式表 stylesheet

<p>
<img src="../../docs/c03.png" width="30%" />
</p>

## 组件的样式

组件样式 = 通用样式 + “私有”样式

![rn-style](https://static001.geekbang.org/resource/image/2d/9c/2d0dbe2764f676b3bac28330b7ba969c.jpg?wh=1920x1047)

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
