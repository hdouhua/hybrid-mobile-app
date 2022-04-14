# pressable： 按钮的选择

经历了三次迭代的点按控件，从 touchable 到对 touchable 封装的原生平台风格的点按组件，再到新一代的反馈效果可由开发者自行配置的 pressable 点按组件。

## 如何选择

- 第一代 Touchable，功能丰富但学习成本太高；
- 第二代 Button，简单易用但带了默认样式和反馈效果，通用性太差；
- 第三代 Pressable，同时满足了简单易用和复杂效果可扩展的特性。

因此，在实现自定义的业务按钮组件时，我更加推荐你使用第三代点按组件 Pressable。

## 组件的事件

四种基础点按事件，onPressIn、onPressOut、onPress、onLongPress。
其中，点击事件 onPress 和长按事件 onLongPress 是互斥的，触发了一个就不会再触发另一个了。

判断 onPressIn 事件和 onPressOut 事件之间触发间隔耗时就可以确定是 点击 还是 长按（间隔>500ms）。

### 盒模型区域 box-model

先看看 W3C 规范的盒模型

![button-box-model](https://static001.geekbang.org/resource/image/c2/7e/c2a39b421c9f21bfd34ff0def3494f7e.jpg?wh=455x340)

Content、Padding、Border 默认是不透明度的，但 Margin 是天生透明的，并且不可以设置透明度、设置颜色。

React Native 的组件也是参考 W3C 的盒模型。点按事件的默认触发区域是盒模型中的默认不透明的部分。这些用户看得见的部分，包括 content、padding 和 border 部分。可以看得见才可以点击，这样的设计是非常合理的。

### 可触发区域 HitRect

HitRect 就是盒模型中的不透明的可见区域。你可以通过修改 hitSlop 的值，直接扩大可触发区域。

### 可保留区域 PressRect

通过设置 pressRetentionOffset 属性，来扩大可保留区域 PressRect。

可以反悔？哈哈，把已经按下的手指从可保留区域挪开，然后再松手，就不会再继续触发点击事件了。

![content-hitrect-pressrect](https://static001.geekbang.org/resource/image/a9/27/a916a2b7ba515895ce76097b04c73727.png?wh=1920x1102)
