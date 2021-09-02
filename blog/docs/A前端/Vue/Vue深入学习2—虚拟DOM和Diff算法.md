> **1、snabbdom 是什么？**

snabbdom是“速度"的意思，源码只有200行，使用TS写的，让东西变得模块化



> **2、snabbdom 的 h 函数如何工作？**

h函数用于产生虚拟节点，同时也可以嵌套使用，得到虚拟DOM树，



> **3、什么是虚拟DOM?**

实际上它对真实DOM的抽象结果，是JS和真实DOM之间的一个缓存，原生DOM运行慢，将DOM放在JS层，提高渲染性能。

​	3.1、创建一个虚拟DOM

```javascript
// 真实DOM
<ul id='list'>
      <li class='item'>Item 1</li>
      <li class='item'>Item 2</li>
      <li class='item'>Item 3</li>
</ul>
// 虚拟DOM
 var element = {
        tagName: 'ul', // 节点标签名
        props: { // DOM的属性，用一个对象存储键值对
            id: 'list'
        },
        children: [ // 该节点的子节点
          {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
          {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
          {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
        ]
  }
```

​	3.2、patch函数源码流程图

![image-20210719192255676](https://pic1.zhimg.com/v2-c7569d78e285f075d80f7f8899d2838c_b.png)

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

- 只对比**父节点**相同的新旧子节点（Vnode）,时间复杂度O(n)
- 在比较过程中，循环从两边向中间合拢。

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



> 4.3、diff算法新旧节点对比的过程？

![img](https://pic3.zhimg.com/v2-4a79bece9b4a8687a7370a47990b661e_b.png)

> ①先借助key值找到不需要移动的相同节点。 ②再找到相同的节点，进行移动。 ③找不到的，才会新建删除节点，保底处理。



> **4.3、Diff值得注意的地方**：

- Diff算法更改前后是同一个DOM节点
- 选择器、key相同则判断为同一个节点。
- 只进行同层比较，不会跨层比较。







参考：https://segmentfault.com/a/1190000020663531

https://juejin.cn/post/6921911974611664903



































