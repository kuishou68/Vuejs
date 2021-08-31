> **1、数据响应式原理**

> **1.1、MVVM是什么？**

简单来说，就是数据变了，视图也会跟着变，首先你得定义一个带有{{ }}的模板Model，当数据中的值变化了，视图View就会跟着变化；视图模型View-model是模板Model和视图View之间的桥梁，Vue属于非侵入式，React和小程序就是侵入式（数据变化的时候需要调用提前写好的API）

```javascript
// Vue数据变化，非侵入式
this.a ++
// React、小程序数据变化，侵入式
this.setState({
	a: this.state.a + 1
});
```



> **1.2、数据响应式的中心思想？**

通过重写数据的get和set属性方法，让数据在被渲染时，把所有用到该数据的订阅者，存放订阅者列表中；当数据发生改变时，Notify方法通知所有订阅了该数据的订阅者Watcher，达到重新渲染DOM的目的。

![image-20210721195342776](D:\Code\Vuejs\vue-cli\interview\assets\image-20210721195342776.png)

是不是有点懵了？没关系，举个简单的栗子🌰：

> 《西游记》中的妖怪（Watcher）时刻惦记（订阅）着唐僧（Data），想吃唐僧肉，孙悟空（Component）在听到（get搜集依赖）唐僧被抓的消息后，做出反应（set触发依赖），准备救出师傅。于是来到了妖怪（Watcher）的老巢，跟它大战几个回合后，成功救出唐僧（Data），达到重新踏上（渲染）西天取经（Vittual DOM Tree）的目的！



> **2、尤大找到了一把”上帝的钥匙🔑“    Object.defineProperty()方法：**

 数据劫持、数据代理，MDN这样描述的：直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```javascript
Object.defineProperty(obj(定义那个对象)，'a(定义这个对象的什么属性)'，{
  //属性值定义为多少
	value : 3
})
//-----------------------------------🌰栗子🌰-------------------------------------------
var obj = {};
Object.defineProperty(obj, 'a', {
	get(){
		console.log('访问obj的a属性！');
		return 7;
	},
	set(){
		console.log('改变obj的a属性', newValue);
		temp = newValue;
	}
})
console.log(obj.a);  // 7
obj.a = 9;			 //修改a的值
console.log(obj.a);  // 7
```



> **3、弥补这把钥匙🔑的不足    defineReactive函数：**

为了解决defineProperty()方法存在的问题，get中并不能返回set刚刚修改过的值，再次调用会显示修改前的值，怎么解决这个问题？在外面定义一个全局变量，用来周转变量值。

```javascript
// 解决defineProperty存在到的问题
defineProperty(data(数据对象)，key(键名),val(值)){
	
}
//-----------------------------------🌰栗子🌰-------------------------------------------
var obj = {};
var temp;   //在外面定义一个全局变量，用来周转变量值。
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
            console.log('改变obj的'+ key +'属性!', newValue);
            if(val == newValue){
	            return;
            }
            temp = newValue;
        }
	});
}
defineReactive(obj, 'a',10)
 
console.log(obj.a); // 访问obj的a属性！ 10
obj.a = 69;			//修改a的值
obj.a ++;
console.log(obj.a); // 修改obj的a属性！70
```

```javascript
// definReactive 实现
    // 简化后的版本 
    function defineReactive( target, key, value, enumerable ) {
      // 折中处理后, this 就是 Vue 实例
      let that = this;

      // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
      if ( typeof value === 'object' && value != null && !Array.isArray( value ) ) {
        // 是非数组的引用类型
        reactify( value ); // 递归
      }

      Object.defineProperty( target, key, {
        configurable: true,
        enumerable: !!enumerable,

        get () {
          console.log( `读取 ${key} 属性` ); // 额外
          return value;
        },
        set ( newVal ) {
          console.log( `设置 ${key} 属性为: ${newVal}` ); // 额外

          value = reactify( newVal );

        }
      } );
    }
```



> **4、数组的响应式处理**

改写了7个属性，push(**数组尾部推入**)、pop(**数组尾部移除**)、shift(**数组头部插入**)、unshift(**数组尾部移出**)、splice(**切割**)、sort(**就地排序**)、reverse(**排序位置颠倒**)；

```javascript
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

面试题：**数组中的响应式是怎么实现的？**

答：以Array.prototype为原型，创建了一个arrayMethods的对象，用一个非常强硬的手段，Object.setPrototypeOf()让数组的_ _proto_ _强制指向arrayMethods，这样就可以调用新的改写的7个方法。



> **5、什么是依赖？**

需要用到数据的递归就是**依赖**，在getter中**收集**依赖，在setter中**触发**依赖。

收集依赖的代码封装成Dep类，每个Observer的实例都有一个Dep的实例；

Watcher是一个中介，数据发生变化时通过watcher中转，通知组件。

![image-20210721212250356](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210721212250356.png)

> 再拿《西游记》说，妖怪（Watcher）是怎么知道唐僧（Data）途径此地的呢？那自然是派出去巡山（depend方法）的小妖精（Dep-订阅器）发现（搜集）的；这个小妖精（Dep）巡山有三个目的（属性）：目标（target）、id、subs(所有巡山的信息)，当唐僧（Data）经过某个提前布置好的陷阱（生命周期的hook）时，就会被抓，压入巢穴（targetStack栈顶），交给妖怪（Watcher）。



> **6、什么时候能够把Wather放入到Dep当中？**

Dep类：封装搜集的代码，管理依赖。

Wather类：①将属性值更新；②执行watch中的回调函数handler(newVal, oldVal)

先把wather设置到全局指定位置，然后读取数据；getter函数当中，会从全局唯一的地方，读取正在读取数据的wather，并把wather再搜集到Dep当中。

```javascript
//wather.js
export default class Dep{
	constructor(){
		// 用数组存储自己的订阅者，subs是subscribes订阅者的意思。
        // 数组里面存放的是wather的实例。
        this.subs = [];
    }
    // 添加订阅
    addSub(sub){
        this.shbs.push(sub);
    }
    // 添加依赖
    dpend(){
        // 指定全局的位置
        if(Dep.target){
            // 如果Dep.target存下，则推入到subs里面
            this.addSub(Dep.target);
            // 
            
        }
    }
    // 通知更新
    notify(){
        // 浅克隆一份
        
    }
}
```



> **7、Vue中怎么识别 a.b.c 的？**

利用高阶函数，逐层取出里面的值。

![image-20210721211629294](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210721211629294.png)

```javascript
<script>
	// 深层套娃
	var o = {
		a: {
			b: {
				c: {
					d: 68
				}
			}
		}
	}
	var str = 'a.b.c.d';
	function parsePath(str){
		// 根据 . 来进行拆分
		var segments = str.split('.');
		// 返回接收对象的函数
		return(obj) => {
			// 遍历接收的函数
			for(let i = 0; i < segments.length; i++){
				// 判断obj存不存在
				if(!obj) return;
				// 一层一层的剥开 o 的心
				obj = obj[segments[i]]
			}
			// 高阶函数，函数内部返回一个函数
			return obj;
		}
	}
	// 调用一下
	var fn = parsePath(str);
	var v = fn(o);
	console.log(v);
</script>
```















参考：https://www.infoq.cn/article/we3l33h5zgyyg6gc9hri

https://juejin.cn/post/6921911974611664903

https://www.bilibili.com/video/BV1G54y1s7xV?p=5&spm_id_from=pageDriver

