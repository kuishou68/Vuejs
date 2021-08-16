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

