## 前言
> Redux 和 React 之间没有关系，它使用与几乎所有的库，甚至纯 JavaScript。  

[redux官方文档自述](https://www.redux.org.cn/)
## 安装
```text
npm install --save react-redux
```
## 三大原则
+ 单一数据流
    + state: 就是一个普通的对象描述应用的状态。  
+ State 是只读的
    + action: 定义描述修改state的一系列操作。
+ 使用纯函数来执行修改
    + reducer: 一个函数，传入state和action 根据action.type 执行对应逻辑，避免修改传入的state,始终返回一个新的state，若无任何变化，返回原state。
