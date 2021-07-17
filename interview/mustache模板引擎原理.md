





![image-20210717165612249](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210717165612249.png)

> **什么是tokens?**

JS的嵌套数组，模板字符串的JS表示形式。

模板字符串：``<h1>我买了一辆{{thing}},{{money}}W</h1>``

tokens: 

```
[
	["text",  "< h1 >我买了一辆"],
	["name",  ”thing“],
	["text",  ","],
	["name",  ”money“],
    ["text",  "W< /h1 >"],
]
```



