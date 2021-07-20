

> **1、snabbdom 是什么？**

snabbdom是“速度"的意思，源码只有200行，使用TS写的，让东西变得模块化



> **2、snabbdom 的 h 函数如何工作？**

h函数用于产生虚拟节点，同时也可以嵌套使用，得到虚拟DOM树，



> **3、什么是虚拟DOM?**

用js对象描述DOM 的层次结构，DOM中的一切属性都在虚拟DOM中有对应到的属性。

​	3.1、创建一个虚拟DOM

```javascript
// 创建patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// 创建虚拟节点
const myVirtual1 = h('a', {
	props: {
		href:'https://blog.lijianlin.com.cn/',
		target: '_blank'
	}
},'魁首');
console.log(myVirtual);

//让虚拟节点上树
const container = document.getElementById('container');
patch(container, myVirtual1);
```

​	3.2、patch函数源码流程图

![image-20210719192255676](https://github.com/kuishou68/assets/blob/main/image-20210719192255676.png)

```javascript
// 手写patch.js
export default function(oldVnode, newVnode){
	// 1、判断传入的第一个参数，是DOM节点还是虚拟节点？
	if(oldValue.sel == '' || oldValue.sel == undefined){
		// 2、传入的第一个参数是DOM 节点，包装成虚拟节点
		oldValue = vnode(oldValue.tagName.toLowerCase(), {}, [], undefined, oldValue);
	}
	// 3、判断oldValue和newValue是否为同一节点？
	if(oldValue.key == newValue.kee && oldValue.sel == newValue.sel){
		console.log('是同一个节点');
		// 3.1、判断新旧vnode是否为同一个对象
		if(oldValue == newValue) return;
		// 3.2、判断新旧vnode有没有text属性
		if(newValue.text != undefined && (newValue.children == undefined || newValue.children.length == 0)){
			console.log('新vnode有text属性');
			// 3.2.1、如果新虚拟节点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的elm中。如果老的elm中的chilren,那么也会立即消失掉。
			if(newValue.text != oldValue.text){
				oldValue.elm.innerHTML = newValue.text;
			}
		}else {
			// 新vnode没有text属性，有chidren
			console.log('新的vnode没有text属性');
			// 3.2.2、判断老的有咩有children
			if(oldValue.children != undefined && oldVlaue.children > 0){
				// 3.2.2.1、老节点有children
				let ch = newVnode.children[i];
				// 3.2.2.2、再次遍历，看看oldValue 中有没有节点和他是same的
				let isExist = false;
				for(let j = 0; j < oldValue.children.length; j++){
					if(oldValue.children[j].sel == ch.sel && oldValue.children[j].key == ch.key){
						isExist = true;	
					}
				}
				if(!isExist){
					console.log(ch, i);
					let dom = createElement(ch);
					ch.elm = dom;
				}
			}else{
				// 3.2.2.3、老节点没有chidlren
				// 3.2.2.4、清空老节点内容
				oldValue.elm.innerHTML = '';
				// 3.2.2.5、遍历新的vnode子节点，创建DOM，上树
				for(let i = 0; i < newVnode.children.length; i++){
					let dom = createElement(newVnode.children[i]);
					oldVnode.elm.appendChild(dom);
				}
			}
		}
	}else{	
		console.log('不是同一个节点')
		let newVnoElm = createElement(newVnode);
		// 4、插入到老节点之前
		oldValue.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
	}
}
```



> **4、diff 算法原理**

​	4.1、diff是发生在虚拟DOM上的，用来计算两个虚拟DOM的差异，并重新熏染。

```javascript
// 创建patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// 创建虚拟节点
const myVirtual2 = h('ul',{},[
	h('li',{key:'A'},'A'),
	h('li',{key:'B'},'B'),
	h('li',{key:'C'},'C'),
	h('li',{key:'D'},'D'),
]);
// 上树
patch(container, myVirtual2);

// 创建替换节点
const myVirtual3 = h('ul',{},[
	h('li',{key:'D'},'D'),
	h('li',{key:'A'},'A'),
	h('li',{key:'B'},'B),
	h('li',{key:'C'},'C'),
	h('li',{key:'D'},'D'),
]);


```

​	**4.2、Diff值得注意的地方**：

- Diff算法更改前后是同一个DOM节点
- 选择器、key相同则判断为同一个节点。
- 只进行同层半价，不会跨层比较。











































