# Sentry

## 用户信息

报错信息的 用户 和 设备 信息

- 用户 ID 生成：`react-native-uuid` 生成 UUID 作为用户唯一标识；
- 存储用户 ID：`react-native-mmkv` 是持久化键值存储工具，性能比 AsyncStorage 更好；
- 设备信息：通过 `react-native-device-info` 来获取设备信息。

## 报错信息收集

### JS 未捕获错误

通过 ErrorUtils.setGlobalHandler 全局错误处理。

>[参考 RN 源代码](https://github.com/facebook/react-native/blob/main/Libraries/Core/setUpErrorHandling.js)

### Promise 未捕获错误

通过设置 PromiseRejectionTracker 的 PromiseRejectionTrackingOptions 来处理未捕获的 Promise 错误。相关源代码片段分析：

- PromiseRejectionTrackingOptions 对象：

   ```ts
   {
     allRejections: true,
     onUnhandled: (id: string, error: Error) => void,
     onHandled: (id: string) => void,
   }
   ```

- 开启 PromiseRejectionTracker：

   ```ts
   if (global?.HermesInternal?.hasPromise?.()) {
     const HermesPromise = global.Promise;
   
     if (__DEV__) {
       if (typeof HermesPromise !== 'function') {
         console.error('HermesPromise does not exist');
       }
       global.HermesInternal?.enablePromiseRejectionTracker?.(
         require('../promiseRejectionTrackingOptions').default,
       );
     }
   } else {
     if (__DEV__) {
       require('promise/setimmediate/rejection-tracking').enable(
         require('./promiseRejectionTrackingOptions').default,
       );
     }
   }
   ```

   - Hermes 引擎自有 enablePromiseRejectionTracker 方法来捕获未被 catch 的 Promise 错误；
   - 非 Hermes 引擎，则使用第三方 Promise 库中 rejection-tracking 提供的 enable 方法来捕获未被 catch 的 Promise 错误。

>[参考 RN 源代码1](https://github.com/facebook/react-native/blob/main/Libraries/Core/polyfillPromise.js)  
>[参考 RN 源代码2](https://github.com/facebook/react-native/blob/main/Libraries/promiseRejectionTrackingOptions.js)

### RN 组件的 render 错误

通过 ErrorBoundary 来实现。

组件 render 报错了，那么会触发 getDerivedStateFromError 回调，在 getDerivedStateFromError 回调中将控制是否有报错的开关状态 hasError 打开，并重新执行 render 渲染降级后的页面 (fallback UI)，同时还会触发 componentDidCatch 回调。可以在 componentDidCatch 回调中将组件的 render 错误上报。

ErrorBoundary 可以作为顶层组件，全局捕获所有子组件的 render 错误。也可以使用 ErrorBoundary 包裹局部组件，当某个局部组件出现错误时，使用 fallback UI 替换。

>[参考 sentry 源代码](https://github.com/getsentry/sentry-javascript/blob/master/packages/react/src/errorboundary.tsx)

### 手动上报

```ts
# 错误信息
Sentry.captureException(new Error('Oops!'))
Sentry.Native.captureException(new Error('Oops!'))
# 普通信息
Sentry.captureMessage('Test Message');
```

**上报更多信息**

```ts
Sentry.setUser();

Sentry.setTag();
Sentry.setTags({});

Sentry.setExtra();
Sentry.setExtras({});

Sentry.setContext();

Sentry.addBreadcrumb();
```

>[参考 sentry-RN 示例代码](https://github.com/getsentry/sentry-react-native/blob/main/sample/src/screens/HomeScreen.tsx)

## 参考

- [sentry 事件对象示例](sentry-event.json)
- [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [iPhone identifiers](https://github.com/SeparateRecords/apple_device_identifiers/blob/main/devices/iPhone.json)
