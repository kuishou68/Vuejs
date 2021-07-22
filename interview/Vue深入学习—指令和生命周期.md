> **Vue是怎么识别  v-  指令的？**

```
// 将HTML结构看作字符串
var ndoeAttrs = node.attributes;
// 类数组对象变为数组
[].slice.call(nodeAttes).forEach(attr => {
	// 这里开始分析指令
	var attrName = attr.name;
	var value = attr.value;
	// 指令都是 v- 开头的
	var dir = attrName.substring(2);
	if(attrName.indexOf('v-') == 0){
		// v-下不同的指令
		if(dir == 'model'){
			console.log('发现了model指令',value);
		}else if(dir == 'if'){
			console.log('发现了if指令',value);
		}
	}
})
```





































