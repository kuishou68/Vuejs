

# 一、2021.9.10 15.00  上海黑湖智造  [官网](https://www.blacklake.cn/)   React Native

## 1.浏览器移动端和小程序有什么区别？



## 2.怎么实现垂直居中？transform 相对浏览器还是父级居中？

```javascript
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
  	    transform: translate(-50%,-50%);//将元素位移自己宽度和高度的-50%
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

## 3.绝对定位postion:static 了解吗？



## 4.事件循环了解吗？

事件循环是指: 执行一个宏任务，然后执行清空微任务列表，循环再执行宏任务，再清微任务列表

- 微任务 `microtask(jobs): promise / ajax / Object.observe`(该方法已废弃)
- 宏任务 `macrotask(task): setTimout / script / IO / UI Rendering`
- 微任务都执行完之后，执行第一个宏任务，



## 5.宏任务和微任务的区别？



## 6.promise了解吗？



## 7.闭包的理解？举个例子



## 8.跨域的解决方案

- 通过jsonp跨域
- 



## 9.你学Vue多久了？



## 10.数据双向绑定原理？



## 11.Vue2和Vue3怎么访问数组？



## 算法题

#### [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

#### [相同的树](https://leetcode-cn.com/problems/same-tree/)



# 二、2021.9.10 17.00  上海瞰点科技 [官网](http://www.seek-data.com)   Vue + ElementUI

## 1.栈和链表的区别？



## 2.怎么递归查找一个二叉树？



## 3.冒泡排序和快排怎么查找数组？



## 4.对盒模型的了解？



## 5.flex布局了解吗？有哪些属性，设置的值有哪些？





## 6.清除浮动的方法有哪些？





## 7.BFC了解吗？



## 8.脚本加载的时候异步的方法有哪些？



## 9.简单介绍一下原型和原型链？



## 10.原型对象是在哪定义的？



## 11.prototype 最终是定义在哪的？



## 12.双等号(==)和三等号(==)的区别



## 13.ES6有哪些新特性？



## 14.Promise的用法？



## 15.v-if 和 v-show的区别？



## 16.计算属性和监听属性有什么区别？



## 17.nextTicek了解吗？



## 18.Vue 数据双向绑定的原理



## 19.Vue2 和 Vue3 的区别?



## 20.vue2.x中如何监测对象变化？

```javascript
vm.$set(vm.items, indexOfItem, newValue)//动态的增加监听
```



## 21.浏览器中存储的机制cookie、loaclStorage、sessionStorage的区别？

**存储大小**方面：Cookie 数据大小不能超过4k，统一站点最多存储20个cookie；

​					 LoalStorage、sessionStorage可以达到5M或更大;

**有效时间**方面：Cookie设置的过期时间内有效；

​					 LocalaSrotage存储持久数据，浏览器关闭后数据不丢失，除非主动删除；

​					 sessionStorage数据在当前浏览器窗口关闭后自动删除；

**与服务器交互**方面：cookie 的数据可以在服务器和客户端之间传递；、

​					localStorage 、sessionStorage 不会自动把数据发送到服务器，仅本地保存。



## 22.浏览器在执行JS的时候有一个事件循环的机制，你了解吗？



 ## 23.HTTP的几种请求方法用途











