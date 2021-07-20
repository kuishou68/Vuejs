> **1、数据响应式原理**

> 1.2、MVVM是怎么实现的？

Vue的编程是非侵入式的，

- ​	Object.defineProperty()方法：

 数据劫持、数据代理，直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```javascript
Object.defineProperty(obj(定义那个对象)，'a(定义这个对象的什么属性)'，{
  //属性值定义为多少
	value : 3
})
//-----------------------------------栗子-------------------------------------------
var temp;
Object.defineProperty(obj, 'a', {
	get(){
		console.log('访问obj的a属性！');
		return temp;
	},
	set(){
		console.log('改变obj的a属性', newValue);
		temp = newValue;
	}
})
```

![image-20210720222709552](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210720222709552.png)

- defineReactive函数：

为了解决defineProperty()方法存在的问题

```javascript
defineProperty(data(数据对象)，key(键名),val(值)){
	
}
//-----------------------------------栗子-------------------------------------------
var obj = {};
function defineProperty(data, key, val) {
	Object.defineProperty(data, key, {
		// 可枚举
		enumerable: true,
		// 可被配置，比如被delete
		configurable: true,
		get(){
            console.log('访问obj的'+ key +'属性！');
            return temp;
        },
        set(){
            console.log('改变obj的'+ key +'属性', newValue);
            if(val == newValue){
	            return;
            }
            temp = newValue;
        }
	});
})
```



- 深层次的遍历



- 数组的响应式处理

改写了7个属性，push 、pop、shift、unshift、splice、sort、reverse

```
// 得到Array.prototype
const arrayPrototype = Array.prototype
// 以Array.prototype为原型，创建arrayMethods对象，定义__proto方法
const arrayMethods = Object.create(arrayPrototype);
// 要被改写的7个数组方法
const methodsNeedChange = [
	'push','pop','shift','unshift','splice','sort','reverse'
];
//遍历
methdsNeedChange.forEach(methodName => {
	// 备份原来的方法
	const original = arrayPrototype[methodName];
	// 把数组身上的__obj__取出来，
	const ob = this.__obj__;
	// 有三种方法push/unshift/splice能够插入新项，把插入的新项变为observe
	let inserted = [];
	switch(methodName){
		case 'push':
		case 'unshift':
			inserted = arguments;
			break;
		case 'splice':
			// splice格式是splice(下标，数量，插入的新项)	
			inserted = arguments.slice(2);
			brack;
	}
	// 判断有没有要插入的新项，让新项也变为响应的
	if(inserted){
		ob.obsetveArray(inserted);
	}
	// 定义新的方法
	def(arrayMethods, methodName, function(){
		original.apply(this, arguments);
	},false);
});
```

面试题：数组中的响应式是怎么实现的？

答：以Array.prototype为原型，创建了一个arrayMethods的对象，用一个非常强硬的手段，Object.setPrototypeOf()让数组的_ _proto_ _强制指向arrayMethods，这样就可以调用新的改写的7个方法。



> **什么是依赖？**

需要用到数据的递归称为依赖，在getter中**收集**依赖，在setter中**触发**依赖。

收集依赖的代码封装成Dep类，每个Observer的实例都有一个Dep的实例；

Watcher是一个中介，数据发生变化时通过watcher中转，通知组件。

























