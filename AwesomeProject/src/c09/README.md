# Fast Refresh：高效 UI 调试

[Fast Refresh](https://reactnative.dev/blog/2019/09/18/version-0.61) 是 0.61 版时推出的功能，从 live-reloading 到 hot-reloading 。

两者的差别，更改代码 -> 保存，
- live-reloading 整个 app 重新加载，重置了应用的状态（也就是丢失了 state）
- hot-reloading app 重新加载更新了的部分，应用之前的状态得以保存。真是高效调试！

## 工作流程

![RN-hot-fast-refresh](https://static001.geekbang.org/resource/image/2f/15/2fd3716c54b10fe645b9a3d4301cdb15.jpg?wh=1980x711)

`react-native start` 命令会启动一个 `Metro` 服务，Metro 服务会把更新的代码打包发送给 React Native 应用。

**一些概念**

- Metro 服务的模块热替换服务
- RN 应用中的模块热替换客户端（HMR Client）
- 在 RN 应用启动时 Metro HMR 服务端 会和 HMR 客户端建立好 socket 连接
- 保存代码时，Metro 服务的 bundle 服务会编译打包改动的部分生成新的 bundle

**几个注意点**

- Fast Refresh 默认保存了函数组件的本地状态
- 如果需要每次编辑重置状态，可以加上 `// @refresh` 注释在组件上
- Fast Refresh 总是重新加载类组件（不会保存状态），这是为了保证可靠性
