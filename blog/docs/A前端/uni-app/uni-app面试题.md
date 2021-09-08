# uni-app面试题

## 1.uni-app生命周期

### 应用生命周期

| 函数名                 | 说明                              |
| ---------------------- | --------------------------------- |
| onLaunch               | 当`uni-app`初始化完成时触发       |
| onShow                 | 当`uni-app`启动，或者进入前台显示 |
| onHide                 | 当`uni-app`从前台进入后台         |
| onError                | 当`uni-app`报错时触发             |
| onUniViewMessage       | 对`nvue`页面发送的数据进行监听    |
| onUnhandledRejectction | 对未处理的Promise拒绝事件监听函数 |
| onPageMNotFound        | 页面不存在监听函数                |
| onThemeChange          | 监听系统主题变化                  |



### 页面生命周期

| 函数              | 说明                 |
| ----------------- | -------------------- |
| onInit            | 监听页面初始化       |
| onLoad            | 监听页面加载         |
| onShow            | 监听页面显示         |
| onReady           | 监听页面初次渲染完成 |
| onHide            | 监听页面隐藏         |
| onUnload          | 监听页面卸载         |
| onResize          | 监听页面尺寸变化     |
| onPullDownRefresh | 监听下拉事件         |
| onReachBottom     | 页面滚动到底部事件   |
| onTabItemTap      | 点击tab时触发        |
| onShareAppMessage | 用户                 |
|                   |                      |
|                   |                      |
|                   |                      |

