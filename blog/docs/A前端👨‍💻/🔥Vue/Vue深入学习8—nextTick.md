# 异步更新nextTick

## 1.场景

有个值发生变化，获取dom最终的值



## 2.实现

- eventloop：
- this.xxx='abc'
  - dep.notify()
  - watcher.update()
  - queueWatccher

- flushSchedulerQueue：执行queue里面所有watcher.run 存放watchers
- flushCallbacks：异步执行callbacks内部所有回调



