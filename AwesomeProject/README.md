# Awesome Project

A demo project made of React Native.

## set up the development environment

> Reference:
>
> - [offical reference - set up development environment](https://reactnative.dev/docs/environment-setup)
> - [video course - Installing React Native on macOS](https://academy.infinite.red/p/installing-react-native-tutorial-on-macos)
> - [video course - Installing React Native on Windows 10](https://academy.infinite.red/p/installing-react-native-tutorial-on-windows-10)

- start react-native metro

  ```shell
  npm i

  npm start
  # or
  npx react-native start
  ```

- run iOS simulator

  ```shell
  cd ios

  # run at the first time, to install required RubyGems
  gem install
  # or by bundler (another tool to manager Gem package dependency)
  bundle install

  # install pod library
  pod install
  # or
  bundle exec pod install
  # build
  xcodebuild -workspace AwesomeProject.xcworkspace -configuration Debug -scheme AwesomeProject -destination 'generic/platform=iOS Simulator'
  # clean
  xcodebuild -clean

  cd ..
  # run
  npm run ios
  # or
  npx react-native run-ios

  # build for release
  npx react-native run-ios --configuration Release
  ```

- run Android emulator

  ```shell
  cd android

  # to see the help for gradle build
  ./gradlew help --warning-mode=all
  # sync gradle
  ./gradlew wrapper
  # download AGP(android gradle plugin) distribution type all, default is bin
  ./gradlew wrapper --gradle-version 7.3 --distribution-type=all
  # release
  ./gradlew assembleRelease
  # clean build cache
  ./gradlew cleanBuildCache

  cd ..
  # run
  npm run android
  # or
  npx react-native run-android

  # release
  npx react-native run-android --variant release
  ```

## issues & tips

1. Could not find node

   ```
   Could not find node. Make sure it is in bash PATH or set the NODE_BINARY environment variable.
   ```

   to fix,

   ```
   sudo ln -s $(which node) /usr/local/bin/node
   ```

   from RN 0.69, may use .env file to set environment variables，for example, create .xcode.env in the folder ios

   ```shell
   export NODE_BINARY=$(command -v node)
   ```

1. Require cycle @`@sentry/react-native`

   ```shell
   Require cycle: node_modules/react-native/Libraries/Network/fetch.js -> node_modules/whatwg-fetch/dist/fetch.umd.js -> node_modules/react-native/Libraries/Network/fetch.js

   Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.
   ```

   > for issue details, please refer to https://github.com/getsentry/sentry-react-native/issues/2080

   > to find all cycling dependencies, please use madge with Graphviz
   >
   > ```shell
   > npm -g install madge
   >
   > madge . --extensions ts,tsx -c --warning
   > ```

   after researching find out the relevant code [here](https://github.com/facebook/metro/blob/main/packages/metro-runtime/src/polyfills/require.js#L170)

   **solution1** from [this](https://github.com/facebook/metro/issues/287#issuecomment-779469905), trying to replace console warning message with empty string.

   ```js
   const fs = require('fs');
   const codeToObscure = /console.warn\(\s*(?=["`]Require cycle:)/;
   const problemFilePath = './node_modules/metro-runtime/src/lib/polyfills/require.js';
   const problemFileContent = fs.readFileSync(problemFilePath,'utf8');
   fs.writeFileSync(problemFilePath,problemFileContent.replace(codeToObscure,'const noConsoleWarn = ('),'utf8');
   ```

   **solution2** from [this](https://github.com/facebook/metro/issues/287#issuecomment-436504616), trying to show warning message 'require cycle' for our own code only

   ```js
   // We want to show A -> B -> A: do this for our own code
   const isExternalOnly = cycle.every(function (cycleWarning) {
      return cycleWarning.includes("node_modules");
   });
   if (!isExternalOnly) {
      cycle.push(cycle[0]);
      console.warn(
         `Require cycle: ${cycle.join(" -> ")}\n\n` +
         "Require cycles are allowed, but can result in uninitialized values. " +
         "Consider refactoring to remove the need for a cycle."
      );
   }
   ```

1. list `$env`

   ```
   node -v && npm -v && npm ls --prod --depth=0

   v14.19.1
   8.3.1
   awesomeproject@0.0.1
   ├── @faker-js/faker@6.3.1
   ├── @react-native-seoul/masonry-list@1.3.0
   ├── @sentry/react-native@3.4.3
   ├── react-native-reanimated@2.8.0
   ├── react-native@0.68.2
   ├── react-query@3.39.0
   ├── react@17.0.2
   └── recyclerlistview@3.0.5
   ```

1. cache issue

   when make some changes but it cannot work at App, such as the setting of babel extension `babel-plugin-module-resolver`, at this moment clearing cache should be on the stage

   ```shell
   rm -rf ios/build android/app/build

   # resetting cache for npm
   npm start -- --reset-cache
   # or
   react-native start --reset-cache

   # clean all
   watchman watch-del-all && rm -rf ${TMPDIR}metro-* ${TMPDIR}haste-map-* node_modules/ && npm cache verify && npm install && npm start -- --reset-cache
   ```

1. start an emulator without android studio

   ```shell
   # list available AVDs (android virtual devices)
   emulator -list-avds

   # use a specific android virtual device
   emulator -avd <name>
   emulator -avd Pixel_5_API_33
   ```

1. issue on watchman

   the error message,

   ```
   watchman --no-pretty get-sockname returned with exit code=1, signal=null, stderr=...
   ```

   please don't forget to set the file permission after `watchman` installed

   ```
   sudo chmod 755 /usr/local/bin/watchman
   sudo chmod 2777 /usr/local/var/run/watchman
   ```

   for more, please refer to <https://facebook.github.io/watchman/docs/install#macos>

## 测试

支持 RN in typescript 需要安装 ts-jest 包，配置请参考 [`jest.config.json`](./jest.config.js)。

> 参考 [ts-jest 文档](https://kulshekhar.github.io/ts-jest/docs/guides/react-native/)，
> [Code Transformation](https://jestjs.io/docs/code-transformation#examples)

运行测试

```shell
npm test
```

清空 jest 缓存

```shell
jest --clearCache
# or
npm test -- --clearCache
```

## 快速读懂 objective-c 代码

- \-: 实例方法
- \+: 类方法
- \[\]: 调用方法

  > 一个方法可以包含多个参数，不过后面的参数都要写名字（指第二个参数开始）。

  翻译 objective-c 的方法调用到通用的 OOC

  ```objective-c
  [self sayHello:YES]
  //=>
  this.sayHello(true);

  [[[MyClass alloc] init:[foo bar]] autorelease];
  //=>
  MyClass.alloc().init(foo.bar()).autorelease();

  //[[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"]
  [NSURL URLWithString:[[[[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil] absoluteString]    stringByAppendingString:@"&inlineSourceMap=true" ]];
  //=>
  NSURL.URLWithString(
      RCTBundleURLProvider.sharedSettings()
      .jsBundleURLForBundleRoot(@"index",fallbackResource:nil)
      .absoluteString()
      .stringByAppendingString(@"&inlineSourceMap=true")
  )
  ```

- 类库 NS 、CF 、 CA 、 CG 、UI
- `#import`：相当于 `#include`
- `@interface`

  ```objective-c
  @interface IA : NSObject {

  }
  @end

  @implementation IA {

  }
  @end
  ```

- 同一数组可以保存不同类型的元素
- `self`: 指向自己的指针，相当于 `this`
- `id`: 指针
- BOOL: 两个值 `YES` `NO`
- `nil`: 空指针，相当于 `null`

## vs-code 一些快捷键

- 切换侧边栏: Command ⌘ + B
- 切换底部面板: Command ⌘ + J
- 打开终端: Control ⌃ + `
- 打开搜索: Command ⌘ + Shift ⇧ + F
- 打开命令面板: Command ⌘ + Shift ⇧ + P
- 跳到上/下一个单词: Option ⌥ + Arrow Left / Right
- 上/下移动行内容: Option ⌥ + Arrow Up / Down
- 多行选择: Option ⌥ + Shift ⇧ + L
- 快速删除行: Command ⌘ + X
- 成对选中： Command ⌘ + D
- Quick Open: Command ⌘ + P
- Bracket matching: Command ⌘ + Shift ⇧ + \
- display the PROBLEMS panel : Command ⌘ + Shift ⇧ + M

## further reading & reference

- [Fabric Architecture - React Native](https://medium.com/mindful-engineering/fabric-architecture-react-native-a4f5fd96b6d2)
- [RN 升级助手](https://react-native-community.github.io/upgrade-helper/)
- [58 车商通 RN 落地与实践 ](https://mp.weixin.qq.com/s?__biz=MzI1NDc5MzIxMw==&mid=2247487390&idx=1&sn=168e4c05f1f12ccdc2c99ad55db88f7b&chksm=ea3e8b0cdd49021a693295bde28f3c210463a644be9fb824a1ae563e18639fee826ff06ba091&scene=21)
- [typescript cheatsheets](https://github.com/typescript-cheatsheets/react)
- [Linting your TypeScript Codebase](https://typescript-eslint.io/docs/linting/)
- [gradle](https://www.cnblogs.com/davenkin/p/gradle-learning-1.html)
- [hooks for RN](https://github.com/react-native-community/hooks)
- [A Comprehensive Guide To Mobile App Design](https://www.smashingmagazine.com/2018/02/comprehensive-guide-to-mobile-app-design/)
- [Mobile App UI Design: An Expert’s Complete Guide for 2022](https://relevant.software/blog/mobile-app-ui-design-guide/)
- [Top React Native Projects for Beginners to Advanced](https://www.interviewbit.com/blog/react-native-projects/)
- [project template](https://instamobile.io/templates/)
- [React Native Example](https://reactnativeexample.com/)
