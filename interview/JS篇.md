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

for...in 遍历获取的是键值，for...of获取的是键名；

for...in 会遍历整个原型链，性能相对较差，for...of返回对象值所对应的下标；

for...in 返回数组中所有可枚举对象，for...of返回数组下标对于的属性值；

