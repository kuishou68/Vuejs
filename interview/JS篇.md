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

通过XMLHttpRequest对象向服务器发送异步请求，拿到数据之后，再通过JS操作DOM节点，达到局部刷新的目的。

① 创建一个XMLHttpRespance请求

② open()方法发送服务器url，请求方式等信息给服务器

③使用onReady监控服务器状态是否已接收

④最后使用send()发送数据









