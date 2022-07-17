# 自定义组件

什么时候用这些自定义的 Native 组件呢？

- RN 还没有相应的模块包装；
- 或者需要复用公司内的一些用 Java/OC 写的通用组件，而不是用 JavaScript 重新实现一遍；
- 又或者需要实现某些高性能的、多线程的代码，譬如图片处理、数据库，或者各种高级扩展等。

如何快速访问原生模块？可以参考官方文档（ [Android](https://www.react-native.cn/docs/native-modules-android) / [iOS](https://www.react-native.cn/docs/native-modules-ios) ）。

在实际开发中，避免踩坑，我们还需要补齐组件的相关基础知识，包括组件的生命周期、组件传输数据类型、以及新架构 (TurboModule 和 Fabric) 。

## 新架构简介

<img alt="redux-async-logic" src="https://static001.geekbang.org/resource/image/3e/31/3eb92714433185cd0a095yy2e1a36331.jpg" width="50%" /><br />


<img alt="redux-async-logic" src="https://static001.geekbang.org/resource/image/4d/8d/4df0702732be0a4922444d575980828d.png" width="50%" /><br />
(主要变更点)

特别是要注意，TurboModule 和 Fabric 对比旧版的 Native Module 和 UIManager 有哪些差异和优势。

>如何在 Android、iOS 上开启新架构、如何在 Android、iOS 上开启使用 TurboModule 和 Fabric ？哪些知名 React Native 库的已适配了新架构？

## 组件的生命周期

### Android

### iOS

## 组件传输数据类型

## RN 与原生的通信方式

## 新架构组件实例分析

### TurboModule：数据存取

### Fabric：视频播放


## reference & further reading

- [原生模块简介](https://www.react-native.cn/docs/native-modules-intro)
- [Adopting the New Architecture](https://reactnative.dev/docs/new-architecture-intro)
