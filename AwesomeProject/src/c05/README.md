# Image：图片加载方式

<p>
<img src="../../docs/c05.jpg" width="30%" />
</p>

## 静态图片

注意这里 require 函数的入参必须是 **字面常量**，而不能是变量。

```jsx
// 方案一：正确
const cat = require('../res/cat_cute.jpeg');
<Image source={cat} />

// 方案二：错误
const path = '../res/cat_cute.jpeg'
const cat = require(path)
<Image source={cat}/>
```

静态图片的加载原理

- 第一步“编译时”，生成了图片注册函数和其注册的信息

```shell
npx react-native bundle --entry-file index.js --dev false --minify false --bundle-output ./build/index.bundle --assets-dest ./build
#
# build
# ├── assets
# │   └── src
# │       └── res
# │           └── cat_cute.jpeg
# └── index.bundle
```

- 第二步“构建时”，将真正图片内到了 App 中

```shell
npx react-native run-ios --configuration Release
```

- 第三步“运行时”，拿到这些图片信息，并加载和展示真正的内置图片

在运行时，require 引入的并不是静态图片资源本身，而是静态图片资源的信息。

## 网络图片

在使用网络图片时，需要将 width & height 属性作为一个必填项来处理。为什么呢？和前面介绍的静态图片资源不同的是，网络图片下载下来之前， RN 是没法知道图片的宽和高的，它们的默认值是 0 ，这样网络图片就展示不了。

```javascript
<Image style={{width: 400, height: 400}} source={{uri: uri}} />
```

网络图片需要考虑使用缓存加速图片加载，提升用户体验。
Android 和 iOS 使用不同的图片加载组件作为缓存机制。

使用图片预加载机制，可以提前把网络图片缓存到本地。

```javascript
Image.prefetch(url);
```

## 宿主应用图片

参考各平台信息。

在实际工作中，不推荐在 RN 中使用宿主应用图片资源
- 这种加载图片的方法没有任何的安全检查，一不小心就容易引起线上报错
- 无法使用 RN 动态更新的优势

## Base64 图片

Base64 指的是一种基于 64 个可见字符表示二进制数据的方式。

Base64 图片指的是使用 Base64 编码加载图片的方法，它适用于那些图片体积小的场景。

**即便是相同的图片，Base64 字符串的体积也要比二进制字节码的体积大约 1/3，这会增加 Bundle 的大小。**

```jsx
<Image
  source={{
    uri: 'data:image/gif;base64,R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs='
  }}
/>
```

[Image to Base64](https://base64.guru/converter/encode/image)

## TODO

RN 框架对图片的默认缓存处理并不是最优的方案，社区中提供了替代方案 [FastImage](https://github.com/DylanVann/react-native-fast-image)，它是基于 SDWebImage (iOS) 和 Glide (Android) 实现的，性能和效果会更好一些。

## 最佳实践

- 关于静态图片资源
  如果使用的是自研的热更新平台，就需要注意图片资源一定要先于 bundle 或和 bundle 一起下发，因为在执行 bundle 时，图片资源是必须已经存在的。
- 关于网络图片和 Base64 图片
  这两类图片之管理起来都不方便，一张张手动上传网络图片不方便，一张张手动把图片 Base64 化也不方便，所以需要一个自动化的工具来管理它们。
  如下是自研自动化图片管理工具的一些方向：
  - 把需要上传到网络的图片放在代码仓库的 assets/network 目录，把需要 Base64 化的图片放在 assets/base64 目录。
  - 在本地开发的时候，可以通过使用 require 静态图片资源的形式，引入 assets/network 或 assets/base64 目录中的图片来进行本地调试。
  - 在代码编译打包的时候，通过工具将 assets/network 目录中的图片上传到 CDN 上，将 assets/base64 目录中的图片都 Base64 化，并将 require 形式的静态图片资源代码转换为网络图片或 Base64 图片的代码。
