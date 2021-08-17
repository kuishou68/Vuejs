# 2021 JavaScript面试题

### 1.new 操作符的工作原理

①.创建一个新的空对象

②.将这个对象的原型设置为函数的  ``prototype``  对象

③.让函数的this指向该对象，为函数添加属性和方法

④.最后返回这个对象



### 2.什么是DOM，什么是BOM?

DOM：文档对象模型，将整个文档看作一个对象，对象中定义了处理网页内容的方法和接口。

BOM：浏览器对象模型，将浏览器看作一个对象，对象中定义了与浏览器进行交互的方法和接口。



### 3.对类数组对象的理解，如何转换为数组

拥**有length和若干索引**属性的对象，与数组类似，但是不能调用数组的方法。

①通过 call 调用函数的 slice、splice 方法  

```javascript
Array.prototype.slice.call(arrayLike, 0);
Array.prototype.splice.call(arrayLike);
```

②通过 apply 调用函数的 concat 方法

```javascript
Array.prototype.concat.apply([], arrayLike);
```

③通过 Array.isArray()

```javascript
Array.from(arrayLike);
```



### 4.对Ajax的理解，如何实现一个Ajax？

通过XMLHttpRequest对象向服务器发送一个异步请求，从服务器拿到数据之后，通过JS操作DOM节点，达到局部刷新的目的。

①首先创建一个XMLHttpRequest对象。

②.open()方法与服务器建立连接，传递请求方式、服务器地址等参数。

③使用onReadystatechange事件，监听服务器端的通信状态。

④最后使用.send()方法发送数据。



### 5.JS为什么会使用变量提升？导致了什么问题？

JS变量提升的目的时为了①提高性能 和 ②增加容错性；

使用变量提升会导致，函数内部变量提升函数内部最顶部，覆盖了外层作用域中传递进来的变量。



### 6.for...in 和 for...of的区别？

for...in 获取键值，遍历整个原型链，返回数组中所有可枚举对象；

for...of 获取键名，只遍历对象，返回数组下标对应的属性值。



### 7.JS有哪些数据类型，区别是什么？

原始数据类型：Undefined、Null、Boolean、Number、String；

引用数据类型：数组、对象、函数。

区别在于**存储位置不同**，原始数据类型占用空间小，大小不固定，存在栈中；引用数据类型占用空间大，大小固定，存在堆中。

BigInt 是一种内置对象，表示任意大的整数，不能与Number一起用，否则就会造成丢失精度的问题，

> 0.1+0.2=0.3 为什么是 false？
>
> 



### 8.数据类型检测方法有哪些？

typeof

instanceof

constructor

Object.prototype.toString.call()



### 9.判断数组的方式有哪些？

Object.prototype.toString.call()

_ _ proto _ _ 

Array.isArray()

instanceof()

Array.prototype.idPrototypeof



### 10.null  和 undefined 的区别？

undefined 是声明了未定义，unll是空对象；



### 11.typeof null = object  为什么？

这是一个历史遗留问题，JS数据类型的底层是以二进制形式存在的，二进制前三位为0 , typeof 就会判定为Object类型，而 null 的二进制恰好都为0，所以 typeof 会误判 null 为 objec t类型。



### 12.Object.is() 与 比较操作符 “===”、“==”的区别

双等号（==）：表示两边数据类型不相等，会对类型进行强转再进行比较；

三等号（===）：表示两边数据类型不相等，直接返回false;

Object.is()与三等号类似，但是做了一些特殊处理，比如 +0 与 -0 不相等，两个NaN是相等的。



### 13.let、const、var的区别

var 存在提升变量，添加全局属性、重复声明变量、改变指针指向等特点；

const 声明必须设置初始值；

let 可以改变指针方向；

const和let 有块级作用域、存在暂时性死区；



### 14.对闭包的理解

我的理解，闭包就是函数之间的套娃，内层函数可以访问到外层函数的作用域。

如果不是特定任务需要闭包，其他情况下使用闭包对内存和速度的消耗还是蛮大的！



### 15.对作用域、作用域链的理解

**作用域**：函数和变量能够被访问到的区域。包含全局作用域、函数作用域、块级作用域。

**作用域链**：当需要使用到某个变量的时候，JS就回去当前作用域中查找，如果找不到，就会去上层作用域继续查找，直到找到为止，这个查找的过程就是一个作用域链。



### 16.对执行上下文的理解

是对JS代码远行环境的抽象概念，只要有js代码远行的地方，就一定运行在执行上下文中。

包含全局执行上下文、函数执行上下文、eval函数执行上下文



### 17.箭头函数(=>)和普通函数(function)有什么区别

①箭头函数更简介，没有自己的this，继承来的this指向永远不会改变，call、bind、apply也不能改变this指向；

②箭头函数不能做构造函数、generator函数使用；

③没有自己的arguments、prototype； 



### 18.箭头函数的this指向哪里？

指向最后一次调用它的对象、指向最后一次调用它的对象、指向最后一次调用它的对象



### 19.对原型、原型链的理解

原型：每个构造函数都有自己的prototype属性，这个属性值是个对象，对象中定义了该函数所有实例共享的属性和方法，这些属性和方法就是原型。

原型链：当需要查找对象的某个属性时，如果对象内部没有这个属性，JS就会去原型对象中查找该属性，直到到达根对象null,找的这个过程就是整个原型链。



### 20.async 和 await 的理解

async 返回一个Promise对象；

await 返回该对象的结果，如果等待的结果不是一个Promise对象，那么就直接返回表达式的结果；如果等待的结果是一个Promise对象，await就会阻塞代码，等待Promise返回value的值，再做await返回结果。



### 21.async await 对比Promsie的优势

①代码阅读起来更加简洁，Promise虽然摆脱了回调地狱，但是then的链式调用看起来很臃肿；

②async await 错误处理更加友好，调试更加方便；



### 22.垃圾回收 与 内存泄露

垃圾回收有引用计数和标记删除两种回收机制

标记删除：变量被声明的时候，就会被加上”存在于上下文“的标记，垃圾回收程序远行的时候，被标记的变量就是待删除变量，随后垃圾回收程序会做一次内存清理，清理所有带标记的变量。

引用计数：变量被引用，引用数+1，变量被覆盖，引用数-1，当变量为0的时候，就会被清理掉回收内存。



### 23.深克隆和浅克隆



### 24.防抖（debounce）与节流(throttle)

![](https://static.vue-js.com/a2c81b50-8787-11eb-ab90-d9ae814b240d.png)

一种优化高频率执行代码的手段

防抖（throttle）: n秒后再执行某一事件，若n秒内被重复触发，重新计时

```javascript
const button = document.querySelector('input');
// 每次事件触发要执行的任务
function payMoney(){
	console.log('点击付款')
}
// 防抖设置
function debounce(){
    func();
}

// 给按钮添加事件监听
button.addEventListener('click',debounce());
```

















