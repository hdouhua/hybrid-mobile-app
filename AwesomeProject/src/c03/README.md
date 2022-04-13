# 使用样式表 stylesheet

<p>
<img src="../../docs/c03.png" width="30%" />
</p>

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
