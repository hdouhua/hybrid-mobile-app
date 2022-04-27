# Debug 调试

广义上讲，调试就是发现问题和解决问题。

调试的思路 ：一个模型，两个原则，三条思路。

- 一个模型指的是，发现问题、找到原因、修复 Bug 的三步模型

- 两个原则：不带上线原则和本地复现原则
  - 要尽可能早地在本地开发时发现问题，提前发现问题是不带 Bug 上线的必要条件；
  - 如果 Bug 已经被带上线了，我们要尽快发现它，还要尽可能多地收集线上信息，让它能更容易地在自己的手机或本地复现。

  >这里面的最佳实践，无外乎
  >- 测试：单元测试、集成测试
  >- code review
  >- 线上数据收集

- 三条思路：“一推理”、“二分法”、“三问人”。

![debug-](https://static001.geekbang.org/resource/image/83/c0/8326a0d730d4ac2fd526ec02dc7125c0.png?wh=1504x1504)

## 调试工具 PK

![debug-tools-comparision](https://static001.geekbang.org/resource/image/ca/5c/ca825d7cdyy4d0513f8244bac454c45c.png?wh=1724x810)

## 拓展

[RN 官方参考](https://reactnative.dev/docs/debugging)
