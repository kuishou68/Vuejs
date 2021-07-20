### 1、``opacity``  和  ``filter:opacity(1)``

可以通过对象0和1之间，或者0%和100%之间的百分比调整透明度。

```html
<style>
    .hide:hover .hide-item,
    .hide:focus .hide-item {
          opacity:0;
    }
</style>
<body>
    <ol class="hide">
        <li>one</li>
        <li class="hide-item">two</li>
        <li>three</li>
    </ol>
</body>
```

![opacity](D:\Code\面试题\opacity.gif)

### 2、 `color`Alpha 透明度

​	除了设置透明度，鼠标经过的时候改变元素颜色也是可行的。

```html
<style>
	.hide:hover .hide-item,
    .hide:focus .hide-item {
          color: rgba(0,0,0,0);
          background-color: rgba(0,0,0,0);
    }
</style>
<body>
    <ol class="hide" tabindex="0">
      <li>one</li>
      <li class="hide-item">two</li>
      <li>three</li>
    </ol>
</body>
```

这些属性可以参考一下

| 属性             | 描述                       |
| ---------------- | -------------------------- |
| transparent      | 完全透明                   |
| rgba(r, g, b, a) | 红色、绿色、蓝色、阿尔法   |
| hsla(h, s, l, a) | 色调、饱和度、亮度和阿尔法 |
| #RRGGBBAA        | 类似 #FFFFFF               |



### 3、``transform``

​	transform 属性可以用于平移、缩放、旋转或倾斜。

```html
<style>
	.hide:hover .hide-item,
    .hide:focus .hide-item {
         transform: scale(0);
         /*transform: translate(-999px, 0px)*/
    }
</style>
<body>
    ...
</body>
```



### 4、``clip-path``

​	clip-path属性创建一个裁剪区域，用于确定元素的那些部分可见。

```
<style>
	.hide:hover .hide-item,
    .hide:focus .hide-item {
        clip-path: circle(0);/*完全隐藏元素的值*/
    }
</style>
<body>
    ...
</body>
```



### 5、``visibility``

​	visibility属性可以设置visible（显示）或hidden（隐藏）。

```
<style>
	.hide:hover .hide-item,
    .hide:focus .hide-item {
        visibility: hidden;/*隐藏元素*/
    }
</style>
<body>
    ...
</body>
```



### 6、``display``

​		display属性比较常用，none可以有效的删除元素，就好像从未存在DOM中一样。	

```
<style>
	.hide:hover .hide-item,
    .hide:focus .hide-item {
        display: none;
    }
</style>
<body>
    ...
</body>
```

​		

### 7、HTML ``hidden`` 属性

​		HTML[`hidden`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)可以添加到任何元素：

```
<p hidden>
	Hello kuishou
</p>
```



### 8、``position`` 定位

​		position属性配合top、bottom、left、right，将整个云素移除屏幕。

```
<style>
	.hide:hover .hide-item,
    .hide:focus .hide-item {
        left:-999px;
        position: absolute;
    }
</style>
<body>
    ...
</body>
```



### 9、叠加另一个元素

​		通过将另一个元素放置在与背景颜色相同的顶部，可以在视觉上隐藏一个元素。在这个例子中，`::after`虽然可以使用任何子元素，但覆盖了一个伪元素。

```
<style>
	.hide-item {
          position: relative;
    }
    .hide-item::after {
          position: absolute;
          content: '';
          top: 0;
          bottom: 100%;
          left: 0;
          right: 0;
          background-color: #fff;
    }
    .hide:hover .hide-item::after,
    .hide:focus .hide-item::after {
          bottom: 0;
    }
</style>
<body>
    ...
</body>
```



### 10、缩小尺寸

​		通过使用最小化其尺寸被隐藏[`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width)，[`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height)，[`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)，[`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width)和/或[`font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)。可能还需要申请[`overflow: hidden;`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)以确保内容不会溢出。

```
<style>
	.hide:hover .hide-item,
    .hide:focus .hide-item {
          height: 0;
          padding: 0;
          overflow: hidden;
    }
    }
</style>
<body>
    ...
</body>
```



