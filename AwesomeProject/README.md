# Awesome Project

A demo project made of React Native.

## set up the development environment

> Reference:
>- [offical reference - set up development environment](https://reactnative.dev/docs/environment-setup)
>- [video course - Installing React Native on macOS](https://academy.infinite.red/p/installing-react-native-tutorial-on-macos)
>- [video course - Installing React Native on Windows 10](https://academy.infinite.red/p/installing-react-native-tutorial-on-windows-10)

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
   
   # at the first time
   bundle install
   
   # install pod library
   bundle exec pod install
   
   # run
   npm run ios
   # or
   npx react-native run-ios
   ```

- run Android emulator

   ```shell
   cd android

   # to see the help for gradle build
   ./gradlew help --warning-mode=all
   # sync gradle
   ./gradlew wrapper

   # run
   npm run android
   # or
   npx react-native run-android

   # release
   ./gradlew assembleRelease
   ```

## 构建问题

1. Could not find node

   ```
   Could not find node. Make sure it is in bash PATH or set the    NODE_BINARY environment variable.
   ```

   修复如下，

   ```
   sudo ln -s $(which node) /usr/local/bin/node
   ```
   
   或者使用 .env file （ 0.69 或以上的版本），创建 .xcode.env 在 ios    文件夹下

   ```shell
   export NODE_BINARY=$(command -v node)
   ```

## 测试

支持 RN in typescript 需要安装 ts-jest 包，配置 `transform`，详情参考 package.json 里的 jest 配置。

>参考 [ts-jest 文档](https://kulshekhar.github.io/ts-jest/docs/guides/react-native/)

## 快速读懂 objective-c 代码

- \-: 实例方法
- \+: 类方法
- \[\]: 调用方法

   >一个方法可以包含多个参数，不过后面的参数都要写名字（指第二个参数开始）。

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

## further reading & reference

- [Fabric Architecture - React Native](https://medium.com/mindful-engineering/fabric-architecture-react-native-a4f5fd96b6d2)
- [RN 升级助手](https://react-native-community.github.io/upgrade-helper/)
- [58 车商通 RN 落地与实践 ](https://mp.weixin.qq.com/s?__biz=MzI1NDc5MzIxMw==&mid=2247487390&idx=1&sn=168e4c05f1f12ccdc2c99ad55db88f7b&chksm=ea3e8b0cdd49021a693295bde28f3c210463a644be9fb824a1ae563e18639fee826ff06ba091&scene=21)
- [react-in-typescript](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)
- [typescript cheatsheets](https://github.com/typescript-cheatsheets/react)
- [Linting your TypeScript Codebase](https://typescript-eslint.io/docs/linting/)
- [gradle](https://www.cnblogs.com/davenkin/p/gradle-learning-1.html)
- [hooks for RN](https://github.com/react-native-community/hooks)
- [A Comprehensive Guide To Mobile App Design](https://www.smashingmagazine.com/2018/02/comprehensive-guide-to-mobile-app-design/)
- [Mobile App UI Design: An Expert’s Complete Guide for 2022](https://relevant.software/blog/mobile-app-ui-design-guide/)
- [project template](https://instamobile.io/templates/)
