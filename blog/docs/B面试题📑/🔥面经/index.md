

# 一、2021.9.10 15.00  上海黑湖智造  [官网](https://www.blacklake.cn/)   React Native

## 1.浏览器移动端和小程序有什么区别？

**开发环境**：小程序是一种应用，运行环境是微信；H5是一种技术，依附浏览器。

**开发成本**：微信团队提供了详细的开发文档，文件上传下载本地存储都有指定的API，在使用这些API时，不用考虑浏览器兼容问题，UI方便也有自家提供的WeUI；H5涉及的开发工具，前端框架（Angular、React）、模块管理工具（Webpack)、浏览器兼容问题，可制定成本高。

**系统权限**：小程序相对于H5能获得更多的系统权限，比如网络通信状态、数据缓存能力。

**用户体验**：H5在页面之间切换会出现白屏、卡顿现象，频繁切换等待时间较长，受网络影响，加载图片、音视频耗费流量较多；小程序虽然本质上是网页，但配合微信的解析器渲染出来的是原生组件的调用效果，体验感方面比较流畅。

**策略定位**：微信本身不缺流量，转发分享带来的流量远远比H5多。

[参考1](https://www.cxyzjd.com/article/weixin_43687095/87391415)  [参考2](https://www.cnblogs.com/flzs/p/13886289.html)

## 2.怎么实现垂直居中？transform 相对浏览器还是父级居中？

### 思路：

![img](https://static.vue-js.com/922dc300-95f9-11eb-ab90-d9ae814b240d.png)

- 初始位置为方块1的位置
- 当设置left、top为50%的时候，内部子元素为方块2的位置
- 设置margin为负数时，使内部子元素到方块3的位置，即中间位置

方法一：**利用定位+margin:负值**

```css
<style>
    .father{
      width:200px;
      height:200px;
      position:relative;
      background:skyblue;
    }
    .son{
      width:100px;
      height:100px;
      position:absolute;
      top:50%;
      left:50%;
      /*将元素位移自己宽度和高度的-50*/
      transform:translate(-50%, -50%);
      /*也可以只使用这种方式*/
    /*   transform:translate(50%, 50%); */
      background:blue;
    }
</style>
<div class="father">
    <div class="son"></div>
</div
```

<iframe height="300" style="width: 100%;" scrolling="no" title="垂直居中" src="https://codepen.io/kuishou68/embed/ExXmmgz?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/kuishou68/pen/ExXmmgz">
  垂直居中</a> by 魁首68 (<a href="https://codepen.io/kuishou68">@kuishou68</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



方法二：**flex弹性盒布局**

```css
<style>
    .father{
          width:200px;
          height:200px;
          display:flex;
          justify-content: center; /*水平轴居中*/
          align-items: center;/*交叉轴居中*/
          background:skyblue;
    }
    .son{
          width:100px;
          height:100px;
          background:blue;
    }
</style>
<div class="father">father
	<div class="son">son</div>
</div>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="垂直居中flex" src="https://codepen.io/kuishou68/embed/bGRWWRL?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/kuishou68/pen/bGRWWRL">
  垂直居中flex</a> by 魁首68 (<a href="https://codepen.io/kuishou68">@kuishou68</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



方法三：**grid网格布局**

```css
.father{
  display:grid;
  width:200px;
  height:200px;
  justify-content:center;
  align-items:center;
  background:skyblue;
}
.son{
  width:100px;
  height:100px;
  background:blue;
}
<div class="father">
  <div class="son">son</div>
</div>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="垂直居中grid" src="https://codepen.io/kuishou68/embed/OJgmmOO?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/kuishou68/pen/OJgmmOO">
  垂直居中grid</a> by 魁首68 (<a href="https://codepen.io/kuishou68">@kuishou68</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 3.绝对定位postion:static 了解吗？

`static`: 该关键字指定元素使用正常的布局行为，也就是元素在文档常规流中 当前的布局位置，此时 `left`,`right`,`top`,`bottom`,`z-index`属性都无效。

`relative`:在不改变页面布局的前提下调整元素位置

`absolute`: 元素会被移出正常的文档流，并不为元素预留空间，相对于最近的非static属性元素偏移。

`fixed`：通过指定元素相对于屏幕视口位置来指定元素位置，在屏幕滚动时元素的位置不会改变。

`sticky`：相对定位和固定定位的混合，元素在跨越特定值之前为相对定位，跨越之后为固定定位。

<iframe height="300" style="width: 100%;" scrolling="no" title="sticky粘性定位" src="https://codepen.io/kuishou68/embed/qBjmmJZ?default-tab=html%2Cresult&editable=true&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/kuishou68/pen/qBjmmJZ">
  sticky粘性定位</a> by 魁首68 (<a href="https://codepen.io/kuishou68">@kuishou68</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



## 4.事件循环了解吗？（Event Loop)

JS是单线程的，为了解决单线程阻塞问题，JS就用到了事件循环，

**事件循环**指的是：JS中所有任务分为同步任务和异步任务，同步任务直接进入主执行栈，异步任务（ajax、setTimeout）进入任务队列；主线程内的任务执行完，会读取任务队列中的结果，推入主线程执行，重复执行的这个过程就是事件循环。

![img](https://camo.githubusercontent.com/e25d50e7473d8a8d90bd58b8e3b09c1ec301fd9b9ea25488c9c08e988ba5747a/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f36316566626332302d376362382d313165622d383566362d3666616337376330633962332e706e67)

- 微任务 ` promise / ajax / MutaionObserver`

- 宏任务 `setTimout / setInterval / postMessage/ IO `

- **执行顺序**：微任务都执行完之后，执行第一个宏任务

- **执行流程**：执行一个宏任务，如果遇到微任务，就将它放到微任务队列中；

  ​       		当宏任务执行完后，会查看微任务的事件队列，然后将里面所有的微任务依次执行完。

  ```javascript
  console.log(1)
  setTimeout(()=>{
      console.log(2)
  }, 0)
  new Promise((resolve, reject)=>{
      console.log('new Promise')
      resolve()
  }).then(()=>{
      console.log('then')
  })
  console.log(3)
  // 实际结果是：1=>'new Promise'=> 3 => 'then' => 2
  // 遇到 console.log(1) ，直接打印 1
  // 遇到定时器，属于新的宏任务，留着后面执行
  // 遇到 new Promise，这个是直接执行的，打印 'new Promise'
  // .then 属于微任务，放入微任务队列，后面再执行
  // 遇到 console.log(3) 直接打印 3
  // 好了本轮宏任务执行完毕，现在去微任务列表查看是否有微任务，发现 .then 的回调，执行它，打印 'then'
  // 当一次宏任务执行完，再去执行新的宏任务，这里就剩一个定时器的宏任务了，执行它，打印 2
  ```

  

## 5.宏任务和微任务的区别？



## 6.promise了解吗？



## 7.闭包的理解？举个例子

函数套娃，内层函数可以访问外层函数的作用域，每创建一个函数，闭包就会在函数创建的同时被创建出来，作为函数内部和函数外部的桥梁。

```javascript
function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() { // displayName() 是内部函数，一个闭包
        alert(name); // 使用了父函数中声明的变量
    }
    displayName();
}
init();
```



## 8.跨域的解决方案

- 通过jsonp跨域，只限于get请求

  利用`<script>`标签指向一个需要访问的地址并提供一个回调函数，用来接收数据。

  ```javascript
  <script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
  <script>
      function jsonp(data) {
      	console.log(data)
  	}
  </script>    
  ```

- CORS

  浏览器会自动进行`CORS`通信，前端设置 `Access-Control-Allow-Origin`就可以开启`CORS`,表示那些域名可以访问资源，如果设置统配符，则表示所有网站都可以访问资源。

- document.domain

  只需要给页面添加 `document.domain = 'test.com'` 表示二级域名相同，就可以实现跨域；

  该方式只能用于二级域名相同的情况下，比如 `a.test.com` 和 `b.test.com`。

- postMessage

  用于获取嵌入页面中的第三方页面数据，一个页面发送消息，另一个页面接收消息。

  ```javascript
  // 发送消息端
  window.parent.postMessage('message', 'http://test.com');
  // 接收消息端
  var mc = new MessageChannel();
  mc.addEventListener('message', (event) => {
      var origin = event.origin || event.originalEvent.origin;
      if (origin === 'http://test.com') {
          console.log('验证通过')
      }
  });
  ```

  

## 9.你学Vue多久了？



## 10.数据双向绑定原理？

通过重写get和set属性方法，让数据在被渲染时，把订阅了该数据的订阅者，存放到订阅者列表Watcher中去;

当数据发生改变时，Notify方法通知订阅了该方法的所有订阅者，达到重新渲染的目的。



## 算法题

#### [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

```javascript
var isValid = function (s) {
	s = s.split('');
    let s1 = s.length;
    // 如果s长度为奇数，直接返回false
    if(s1 % 2) return false;
    // 枚举所有括号，保存在map中
    let map = new Map([[')','('],[']','['],['}','{']]);
    // 新建空栈
    let stack = []；
    for(let i of s){
        // 如果map中找到了s中的括号
        if(map.get(i)){
            // 如果栈中没有该括号
            if(stack[stack.length-1] != map.get(i)) return false;
		   // 否则弹出栈
            else stack.pop(i);
        }else{
            // 推入栈
            stack.push(i);
        }
    }
    // 返回一个非空栈长度
    return !stack.length;
}
```



#### [相同的树](https://leetcode-cn.com/problems/same-tree/)

```javascript
var isSameTree = function(p, q) {
    // 如果都为空
    if(p==null && q==null) return true;
    // 如果有一个为空
    if(p==null || q==null) return false;
    // 如果两个节点不相等
    if(p.val != q.val) return false;
    // 递归对比左右子树
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```



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



## 20.vue2.x中如何监测数组和对象变化？

Array的话，Vue将data中的数组进行原型链重写，指向了自己定义的数组原型方法。

- 当利用索引直接设置一个数组项时，例如vm.items[indexOfItem] = newValue

```javascript
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)//动态的增加监听
```

- 当修改数组的长度时，例如vm.items.length = newLength

```javascript
// Array.prototype.splice
vm.items.splie(indexOfItem, 1, newValue)
```

Object的话，通过Object.defineProperty结合递归就能实现

[参考](https://www.cnblogs.com/qinglaoshi/p/13269739.html)



## 21.浏览器中存储的机制cookie、loaclStorage、sessionStorage的区别？

**存储大小**方面：Cookie 数据大小不能超过4k，同一站点最多存储20个cookie；

​					 LoalStorage、sessionStorage可以达到5M或更大;

**有效时间**方面：Cookie设置的过期时间内有效；

​					 LocalaSrotage存储持久数据，浏览器关闭后数据不丢失，除非主动删除；

​					 sessionStorage数据在当前浏览器窗口关闭后自动删除；

**与服务器交互**方面：cookie 的数据可以在服务器和客户端之间传递；、

​					localStorage 、sessionStorage 不会自动把数据发送到服务器，仅本地保存。



## 22.浏览器在执行JS的时候有一个事件循环的机制，你了解吗？



 ## 23.HTTP的几种请求方法用途



# 三、2021.9.16 紫光  Vue + elementUI 

## 1.Vue 和 JQuery 最大的区别在哪？



## 2. Computed 和 Watch 的区别?



## 3. Watch 是怎么监听变化的？



## 4.父子组件之间怎么通信的？





# 四、2021.9.17   9.30  上海瑞谷拜特  [官网](http://www.bitech.cn/)  HR面

## 1.简单自我介绍一下



## 2.你对我们公司了解吗？



## 3.你对未来职业规划是怎样的？



## 4. 为什么选择前端这个方向？





# 五、2021.9.17 10.19 东华软件 Vue + [axios](http://www.axios-js.com/) + [iview](https://weapp.iviewui.com/) 银行业务  实习2-3k，转正8-10k

## 1. 权限管理是怎么实现的？



## 2. Vue是怎么跟后端进行数据交互的

axios.get 

axios.post



## 3. 你用过那些UI组件？









