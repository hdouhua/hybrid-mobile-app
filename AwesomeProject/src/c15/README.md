# 手势 Gesture

Gesture 组件 `react-native-gesture-handler`

>Gesture Handler aims to replace React Native's built in touch system called [Gesture Responder System](http://facebook.github.io/react-native/docs/gesture-responder-system).

## 手势基础

了解手势的基本原理，以 Pressable 点按事件为例，组件响应的整体流程：

>是硬件和软件相互配合的过程。  
>从触摸屏识别物理手势开始，到系统和框架 Native 部分把物理手势转换为 JavaScript 手势事件；
>再到框架 JavaScript 部分确定响应手势的组件；
>最后到 Pressable 组件确定是点击还是长按。

这里的框架的 JavaScript 部分指的就是 RN 自带的 [PanResponder](https://www.react-native.cn/docs/panresponder) 手势系统。

## Gesture 手势组件

### Gesture 人机交互的 4 步流程

![Gesture-response-flow](https://static001.geekbang.org/resource/image/5a/3a/5a3187dea427914627cac18b10880b3a.png?wh=1920x1270)

1. Gesture 手势库收到系统手势事件；
1. Gesture 手势库确定需要响应哪些组件；
1. Gesture 手势库触发相关手势回调函数；
1. 通过 Gesture 回调函数返回 event 参数，使用回调返回值 event 可以更新共享值或状态，执行动画或渲染。

### 手势的状态变化

`UNDETERMINED` -> `BEGAN` ------> `ACTIVE` ------> `END` -> `UNDETERMINED`

Another possible flow is when a handler receives touches that cause a **recognition failure**:

`UNDETERMINED` -> `BEGAN` ------> `FAILED` -> `UNDETERMINED`

At last, when a handler does properly recognize the gesture but then is **interrupted** by the touch system the gesture recognition is canceled and the flow looks as follows:

`UNDETERMINED` -> `BEGAN` ------> `ACTIVE` ------> `CANCELLED` -> `UNDETERMINED`

### Gesture 的使用

Gesture 手势库真正厉害的地方，在于能和 Reanimated 动画库配合使用，二者结合，能实现各种丰富的手势动画。

**在学习 Gesture 手势库的时候，要注意区分 UI 线程和 JavaScript 线程。**
- Gesture 在**声明和初始化过程是运行在 JavaScript 线程中的**，但声明之后的**手势回调函数的执行都是默认运行在 UI 线程的**。
- Gesture 手势库和 Reanimated 动画库搭配使用时，Gesture 的手势回调函数是在 Reanimated 动画库创建的 UI 线程的 JavaScript 虚拟机中执行的。手势动画的全过程都可以运行在 UI 线程，不受 JavaScript 线程性能瓶颈的约束。

参考 [官方快速开始](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)

```tsx
const singleTap = Gesture.Tap().onStart(() => {
  console.debug('start to tap');
});

<GestureHandlerRootView style={styles.container}>
  <GestureDetector gesture={singleTap}>
    <View style={styles.rectangle} />
  </GestureDetector>
</GestureHandlerRootView>
```

使用根组件 `GestureHandlerRootView` 包裹 `GestureDetector` ，设置组件 GestureDetector 的 `gesture` 属性。
>GestureDetector 组件并不会真正渲染到屏幕上，只是用于绑定手势到视图。

#### 单击/拍手势

参考 [代码](./Tap.tsx)

#### 拖拽手势

实现一个拖拽动画主要分为三步：
1. 创建 Gesture.Pan 手势并将拖拽手势绑定到动画组件上；
2. 在 Gesture.Pan 拖拽手势的 10 个手势回调中，选择 onBegin 和 onFinalize 手势回调响应拖拽开始和拖拽完成，选择 onChange 响应拖拽移动；
3. 在相应的拖拽回调中同步更新动画组件的共享值，也就是 x、y 轴坐标，实现基础的拖拽动效。

拖拽手势的 10 个回调，如下依次触发：
- onBegin ：开始识别到手势，此时拖拽并未发生。也就是说，这时手指是触碰到 View 视图，手指还未移动；
- onTouchesDown ：手指按下触摸到视图时触发。可以理解为在手指触摸到视图时，先触发了 onBegin ，紧接着就触发了 onTouchesDown；
- onTouchesMove ：手指移动后触发；
- onStart ：当手指移动距离超过 Float.MIN_VALUE 的阈值时(也就是精度为 0.000000 的距离时)，触发该回调，此时拖拽事件正式触发；
  >手指触碰和离开视图时是不会触发 onStart 和 onEnd 回调的
- onUpdate ：在手指移动的过程中，会更新 x/y 坐标等参数，参数更新后 onUpdate 回调就会触发；
- onChange ：在手指移动的过程中，紧接着 onUpdate 触发。onChange 和 onUpdate 的区别是，坐标参考不同：
  - onChange 的参数是以上一次回调的参数作为基准进行更新的；
  - onUpdate 是以手势触发 onStart 时的参数为基准进行更新的。
- onTouchesUp ：当手指离开屏幕时触发，与 onTouchesDown 是成对的；
- onEnd ：当手指离开屏幕时，先触发 onTouchesUp 回调，紧接着触发 onEnd 回调，与 onStart 是成对的；
- onTouchesCancelled ：较为少见，一般是在系统弹窗等中断手势的情况下触发；
- onFinalize ：只要手势结束，最终都会触发。

参考 [代码](./Drag.tsx)

## reference & further reading

- [How does it work?](https://docs.swmansion.com/react-native-gesture-handler/docs/under-the-hood/how-does-it-work)
