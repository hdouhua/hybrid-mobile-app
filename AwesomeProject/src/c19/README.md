# 大型应用的状态管理： Redux

之于 React 应用的状态管理，市面上有多种声音

- 是时候抛弃 Redux，直接用 useReducer 和 useContext 对大型应用进行状态管理了；
- 虽然 Redux 解决了状态管理的问题，但是 Redux 模板代码太多，应该抛弃 Redux，改用 Mobx 或 Zustand 这类写起来更简单的工具。
- ……

但基于目前真实的大型应用，Redux 依旧应该最优先考虑的状态管理工具，原因如下
- 一方面， useContext 并不是状态管理工具，它只是一个提供了跨层级传递状态的工具而已。大型项目的状态管理复杂度很高，真要拿 useReducer 和 useContext 来写大型项目，需要写更多的模板代码，而且更难维护。
- 另一方面，关于 Redux 模板代码多的问题，可以使用 [Redux Toolkit (RTK)](https://redux-toolkit.js.org/introduction/getting-started) 来部分解决。

## Redux 什么时候用

一个应用的状态管理要复杂到什么程度才需要引入 Redux？一个最好的判断标准是，当你觉得状态管理是你研发痛点的时候，你才需要开始着手解决。

- 当有大量的全局状态需要管理时，
- 当应用状态频繁更新遇到性能瓶颈时，
- 当管理状态的逻辑复杂到需要代码分治时，
- 当多人协作开发需要遵守同一套最佳实践时，

是时候，该考虑使用 Redux 了。

Redux 通过 Store 存储了全局状态，它不仅解决了状态需要逐层传递的问题，还避免了整个应用的 re-render，不容易出现相关的性能问题。

## Redux 的工作原理

>Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

一句话概括就是：State 驱动 View 更新，用户操作 View 触发 Action ， Action 更新 State。

- Store ： React components read data from the store with the useSelector hook
- Action ： React components dispatch actions to update the store using the useDispatch hook
- Reducer ： Redux state is updated by "reducer functions"

<center>
<img alt="redux-async-logic" src="https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif" width="50%" /><br />
(异步工作更新的流程)
</center>

从 `@reduxjs/toolkit` 和 `react-redux` 中引入了 configureStore、createSlice、Provider、useSelector、useDispatch。整个过程大致如下：
- 使用 Provider 组件向应用的其他组件提供获取 Store 的能力；
- 使用 configureStore 函数创建 Store；
- 使用 createSlice 函数创建分片 {actions, reducer}；
- 使用 useSelector 获取分片 State；
- 使用 useDispatch 生成的 dispatch 来发送 action。

Redux Toolkit 的本质是提供了一些工具函数，简化纯手写 Redux 代码的冗余逻辑，其中最重要的两个工具函数是：
- configureStore ：管理所有全局状态的函数，它的返回值是一个 Store 对象；
- createSlice ：管理分片全局状态的函数，其返回值是一个分片对象，该对象上最重要的两个属性是：
   创建分片时需要传入分片的初始状态和分片状态更新的 reducer
   - actions ：分片 action 的函数集合；
   - reducer ：已经创建好的分片 reducer。

React-Redux 的 1 个组件和 2 个常用的钩子函数：
- Provider ： Provider 是一个组件，该组件接收存储所有全局状态的 Store 对象作为参数。Provider 组件底层用的是 useContext，它为整个应用的其他组件提供获取 Store 对象的能力；
- useSelector ：从 Store 中获取当前组件需要用到的状态；
- useDispatch ：用于发送指令的钩子函数，其返回值是 dispatch 函数，而 dispatch 函数的入参是 action。

## Redux 的最佳实践

虽然使用 Redux 来管理状态需要 5 个步骤，比使用 useState 的 3 个步骤多了两个步骤。但使用 Redux 来管理全局状态能提高应用的可测试性和可维护性，这些特性正是复杂项目、大型项目所需要的。

对一个大型项目而言，Redux 并不是唯一状态管理方案，通常还会搭配使用 useState 和 ReactQuery 。比如，用 useState 来管理组件状态，用 Redux 来管理全局状态，用 ReactQuery 来管理异步状态。

## reference & further reading

- [redux best practices](https://redux.js.org/style-guide/)
- [Idiomatic Redux: Designing the Redux Toolkit Listener Middleware](https://blog.isquaredsoftware.com/2022/03/designing-rtk-listener-middleware/)
