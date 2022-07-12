# 混合应用 Hybrid App

——跨端应用。大型 App 通常是多套跨端框架并存的，比如 H5 + React Native + 布局动态化，或 H5 + Flutter。具体选型主要以业务场景、包大小、性能、运行内存、动态更新能力为标准进行。

## 混合开发的优点

- 开发效率高，一套代码可以在 Android、iOS 上运行；
- 更新部署方便，无须依赖应用市场发版，迭代更新速度快；
- 具备动态更新能力，很好地满足业务快速迭代、Bug 快速响应。

## 混合开发的缺点
- 性能不佳
   - H5 渲染链路长
   - React Native 依托于 JS bridge 交互 （最新架构架构改进了，使用 JSI ， 目前还没有完全普及）
   - Flutter 绘制流程虽然直接使用 Skia，但依赖于原生的能力仍需异步交互
- 兼容性差

   Android 、iOS 各版本都存在各种兼容性问题，特别是 Android 碎片化严重
- 问题排查成本高

   跨端框架一般涉及 Native 、 FE 、 Server ，中间做了大量的桥接转换，排查链路比纯 Native 长
- 动态化能力受限

   跨端框架动态更新的业务涉及 Native 部分的组件更新，需要依赖 App 发版

## 混合模式开篇

### Android

#### 一、创建项目

**项目结构**

<center>
<img alt="redux-async-logic" src="https://static001.geekbang.org/resource/image/13/af/13e5c0527c254bc75a48ffb031ea36af.png" width="50%" /><br />
(项目结构)
</center>

混合工程模式的几点思考
- 不侵入现有工程结构，RN 模块会作为现有工程的一部分进行组织管理。
- 不影响代码仓库管理，不用把 Android 、iOS 放在同一代码仓库下进行管理。
- 方便进行组件功能复用，可以将 RN 模块独立成组件，提供给其他 App 平台使用。

#### 二、添加依赖

主要的依赖就是
- react-native：React Native 的核心框架；
- JavaScript 引擎：可选 JSC、Hermes，用于执行 JavaScript。

选择 JS engine 使用 JSC 还是 Hermes ？

- 在启动性能上，Hermes 比 JSC 更快。Hermes 采用的是 AOT 提前编译的方案，它支持字节码文件，相比于 JSC，Hermes 不用先将 JavaScript 文本编译为字节码，节约了编译字节码的耗时，自然启动性能更好。
- 在运行性能上，JSC 比 Herems 更快。JSC 使用的是 JIT 即时编译方案，该方案支持动态缓存热点代码，因此运行性能上更快。

为工程添加 React Native 相关的依赖，包括：
- react-native.arr 文件；
- react-native.aar 依赖的第三方库；
- JavaScript 引擎 aar 文件。

**实施**

1. Android 引入本地 aar 文件需要在工程根目录 build.gradle 添加 flatDir 配置：

```gradle
allprojects {
    repositories {
        google()
        jcenter()
        // 添加 flatDir 配置
        flatDir {
            dirs 'libs'
        }
    }
}
```

2. Android 的 app 模块下的 build.gradle 添加依赖：

```gradle
implementation(name:'react-native-0.68.0-rc.3', ext:'aar')
```

3. 将 node_modules/react-native/ 目录下的 react-native-0.68.0-rc.3.pom 中的依赖库，按照 android gradle 依赖的方式进行添加，这些依赖主要是 react-native aar 本身远程依赖的第三方库。添加好的 app build.gradle 如下：

```gradle
dependencies {
    implementation(name:'react-native-0.68.0-rc.3', ext:'aar')

    implementation 'com.facebook.infer.annotation:infer-annotation:0.18.0'
    implementation 'javax.inject:javax.inject:1'
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'com.facebook.fresco:imagepipeline-okhttp3:2.5.0'
    implementation 'com.facebook.fresco:fresco:2.5.0'
    implementation 'com.facebook.soloader:soloader:0.10.3'
    implementation 'com.google.code.findbugs:jsr305:3.0.2'
    implementation 'com.squareup.okhttp3:okhttp:4.9.2'
    implementation 'com.squareup.okhttp3:okhttp-urlconnection:4.9.2'
    implementation 'com.squareup.okio:okio:2.9.0'
}
```

4. 添加下 JavaScript 引擎 aar （并在 build.gradle 中添加依赖）

JSC 引擎
拷贝 node_modules/jsc-android 目录下 jsc 的 so 动态库 android-jsc-r250230.aar 到 libs 目录

Hermes 引擎
拷贝 node_modules/hermes-engine 目录下的 hermes-cppruntime-release.aar & hermes-release.aar 到 libs 目录

#### 三、配置权限

添加下权限和清单配置。只需要在原生 Android 项目里 app/AndroidManifest.xml 清单文件中声明网络权限

```xml
<uses-permission android:name="android.permission.INTERNET" />

<!-- 访问开发者菜单界面  -->
<activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
```

### iOS

#### 一、创建项目

在工程 node_modules/react-native/template/ 目录下执行 npm install，然后进入它下面的 ios 目录下执行 pod install，结束后再打开我们的原生应用

1. 将以下三个 React Native 源码引入到 iOS 工程中，这三个源码分别为 Libraries、React，以及 React Common

2. 将这三个部分作为 React Native 功能模块，集成到 iOS 工程中

>三个不同模块的 podspec 请参考 https://github.com/facebook/react-native

#### 二、添加 iOS 端依赖的库

修改 Podfile，来引用其他依赖的第三方库，包括 DoubleConverison、glog、RCT_Folly、libevent，等等。podspec 配置文件则直接使用官方提供的文件。

### 对比 Android 混合模式 和 iOS

对比两端的操作，Android 与 iOS 中 RN 混合应用的工程组织结构是一样的。与 RN 新项目不同，在已有 Android 和 iOS 项目中接入 RN ，都是把 RN 当成子模块进行引入的。

不过，环境配置流程中，Android 侧重于依赖 RN 的框架 aar，以及 JavaScript 引擎 aar，而 iOS 则是使用源码方式集成 RN 相关的依赖库。两方的核心都是依赖 RN 框架、JavaScript 引擎，以及框架本身依赖的其他库。

## 混合开发载体页面

所谓载体页面也就是承载 RN 的页面，确切地说是加载渲染 RN 的容器。在 Android 中为 Activity/Fragment ，在 iOS 中为 ViewController。

一个简单的载体页只需要初始化、加载渲染、生命周期管理、组件注册能力即可。以 Android 为例，搭建一个 Activity ，构建 ReactRootView ，初始化 ReactInstanceManager 就可以加载本地的 bundle 文件了。

>可以按照[官方文档](https://www.react-native.cn/docs/integration-with-existing-apps)，快速搭建一个 RN 载体页练手。

在实际开发中，我们使用 RN，除了看中它跨平台的优势外，还需要它的热更新能力。并且，为了进行调试和分析，需要具备错误处理、上报能力；以及复杂业务中，Native & JavaScript 通信还需要提供通信能力。甚至，根据业务需求，还需要提供一些通用内置组件、组件注册能力，等等。

综合以上，一个可用于商业上线的载体页，需要提供初始化、加载渲染 RN 页面、热更新、缓存管理、生命周期管理、 Native & JavaScript 通信、错误处理、错误上报、内置基础组件、组件注册等能力。

### 载体页的整体设计

<center>
<img alt="redux-async-logic" src="https://static001.geekbang.org/resource/image/53/79/53d89b657d6532f86563c19e7a7a0e79.jpg" width="50%" /><br />
(载体页面)
</center>

- UI 结构

  在混合开发中，RN 大部分以独立页面存在，载体页可以包含通用标题栏和 RN 容器。当然也可以直接暴露容器视图，由使用方动态进行添加；

- 对外能力

  包含生命周期管理、Native 与 JavaScript 通信能力、内置的基础业务组件、组件注册能力、异常回调、错误上报等，同时还需要提供热更新、加载 bundle 的能力；

- 热更新

  请求远程服务器获取对应 bundle 是否有最新版本。有最新版本则下载并进行缓存，无最新版本则使用缓存进行加载 (无缓存则先下载)，其中包含预加载、异步更新等业务策略提升加载性能。

- 缓存管理

  通常 bundle 包随着业务体量增加，体积会越来越大。针对这种情况，常用策略是拆包、按需加载，bundle 包在传输过程中会进行 zip 压缩、加密，下载成功后进行解压、校验。每个 bundle 文件都有对应的 id、版本号、content hash；

- bundle 加载

  JavaScript 引擎读取 bundle 文件，常用引擎包括 JSC、Hermes；

- RN 运行环境

  整个 RN 运行环境包含负责渲染的 RootView，框架内置核心组件、业务定制组件，执行脚本的 JavaScript 引擎，负责 Native 与 JavaScript 交互的 bridge/JSI。

### 初始化载体页面

#### Android

- ReactContext：继承于 ContextWrapper，是 RN 应用的上下文，管理着 CatalystInstance 以及三大线程 （UIThread、NativeModulesThread、JSThread）；
- ReactInstanceManager：总的管理类，管理 ReactPackage、ReactContext、ReactRootView、控制生命周期，同时还可以设置 JavaScript 引擎；
- ReactRootView：RN 渲染的原生容器，继承于 FrameLayout；
- CatalystInstance：Java 层、C++ 层、JavaScript 层通信的总管理类，管理着 Java 层、JavaScript 层 Module 映射表与回调，是三端通信的桥梁。实现类为 CatalystInstanceImpl，支持向 JavaScript 注入全局变量、动态加载脚本文件、获取 NativeModules & JSModules；
- JavaScriptModule：JS Module，负责 JavaScript 到 Java 的映射调用格式声明，由 CatalystInstance 统一管理；
- NativeModule：Java Module，负责 Java 到 JavaScript 的映射调用格式声明，由 CatalystInstance 统一管理；
- UIManager: 处理 UI 的渲染，JavaScript 层通过 C++ 层把创建 View 的请求发送给 Java 层的 UIManagerModule。

#### iOS

- 创建一个 Bridge ，与载体页一对一绑定
  在 RN 中，通过 Bridge 实现了 JavaScript 与原生框架之间的通信。调用 RN 提供的 API ，就相当于通过 Bridge 调用原生的 API 。
- 创建一个 RCTRootView ，用于展示 RN 视图的组件。在 JavaScript 代码中 render() 部分的 UI 组件均会渲染到该 View 中。

### 下载 JS Bundle

<center>
<img alt="redux-async-logic" src="https://static001.geekbang.org/resource/image/24/49/24560021a3f881746b0b2d76aa71bb49.jpg" width="50%" /><br />
(热更新策略，动态下载 JS bundle 资源)
</center>

### 加载渲染

#### 加载 JS Bundle

- Android
   - 通过 ReactContext 获取 CatalystInstance 对象，CatalystInstance 实现类为 CatalystInstanceImp。CatalystInstanceImpl 有一个非 public 方法 loadScriptFromFile()，通过这个方法就可以动态加载本地的 bundle 文件了。
   >loadScriptFromFile() 为非 public，所以需要反射获取调用

   - 再调用 ReactRootView startReactApplication 就可以开始加载渲染 RN 页面了。
   >注意： startReactApplication() 中的参数 moduleName 必须对应 `index.js` 中的 `AppRegistry.registerComponent()` 的第一个参数

- iOS

   TBD

## 问题排查与框架 Bug 修复

有 Native 、FE 、Server 三端，中间经过 JavaScript 环境、 Server 数据、 Native 环境的转换，出现了问题，排查链路很长。

以 Android 为例，添加足够多的日志以便快地定位问题。

- 获取错误
- AOP 切片的方式拦截 ReactNative JavaMethodWrapper 调用，捕获 JavaScript 调用 Native Module 的异常
- 查看日志

```
adb logcat | grep React
```

## 参考

- [本文内容主要来源](https://time.geekbang.org/column/article/518965)
- [官方文档 - 集成到现有原生应用](https://www.react-native.cn/docs/integration-with-existing-apps)
