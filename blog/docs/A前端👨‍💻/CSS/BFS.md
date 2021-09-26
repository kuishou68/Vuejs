## BFC 概念
> BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流   
> 作用：形成一个封闭的大盒子，无论内部元素如何变化，都不影响到外部

## 触发BFC
+ body
+ 浮动元素：float 除none以外的值
+ 绝对定位元素：position(absolute, fixed)
+ display: inline-block、 table-cell、 flex
+ overflow: 除visible 以外的值（hidden、auto、scroll）

## 应用
在同一个BFC容器下margin会发生重叠。
```html
<head>
    div{
        width: 100px;
        height: 100px;
        background: lightblue;
        margin: 100px;
    }
</head>
<body>
    <div></div>
    <div></div>
</body>
```
修改如下：
```html
<head>
    .container {
        overflow: hidden;
    }
    p {
        width: 100px;
        height: 100px;
        background: lightblue;
        margin: 100px;
    }
</head>
<body>
    <div class="container">
        <p></p>
    </div>
    <div class="container">
        <p></p>
    </div>
</body>
```
