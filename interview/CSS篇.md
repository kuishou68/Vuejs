# 2021 CSS面试题

### 1.CSS可继承属性有哪些？

- 文字相关：font-famliy  、font-weight 、font-size 、font-style
- 文本相关：text-index（首行缩进） 、text-align（水平对齐） 、line-height 、text-transfrom（文本大小写） 、word-sacping 、letter-spacing 、color 
- 元素可见性：visibility
- 列表布局：list-style
- 光标：cursor



### 2.display的属性值有哪些？

none：元素不显示

block：块级元素

inline：行内元素

inline-block：行内块元素

table：表格

list-item：块类型元素

inherit：从父级基层display属性



### 3.display 的block、inline、inline-block有什么区别？

block：块级元素，独占一行，多个元素另起一行。

inline：行内元素，宽高，水平方向的margin、padding都无效。

inline-block：对象设置为inline对象，对象内容作为为block呈现。



### 4.隐藏元素的方法有哪些？

display:none

visibility:hidden

opacity:0

position:absolute

clip-path:

transform:scale(0,0)

z-index:负值



### 5.link和import的区别？

**<1>**.link 是XHTML标签，不仅能加载CSS，还能加载RSS；而import只能加载CSS.

**<2>**.引入CSS，link页面载入时加载；import需要等待页面载入之后才加载。

**<3>**.link 可以通过JS操作DOM来改变样式，而import不行。



### 6.display:none 和 visibility:hidden 的区别

display:none 隐藏的元素会从渲染树上完全消失，不会占用任何空间，它的子元素也会跟着一起消失；

visibility:hidden 隐藏的元素不会从渲染树上完全消失，会占用一定的空间，如果想让子元素显示，可以给子元素设置visible



### 7.对盒模型的理解？

标准盒模型：宽高的范围只包含了 content;

IE盒模型：宽高的范围为content、padding、border；

可以通过修改 box-sizing: content-box/border-box改变盒模型。



### 8.CSS3中的新特性

圆角边框：border-radio

文字特效：text-shadow

文字渲染：text-decoration

阴影与反射：shadoweflect

多列布局：mult-column layout

线性渐变：gradient

旋转：transform



### 9.伪元素（::）和伪类（:）有什么区别？

**伪元素（::）**：用双冒号表示，在**元素前后**插入**元素或样式**，只存在于页面中，不存在于DOM 中;

**伪类（:）**：将**特定的样式**添加到**特定的元素**上。



### 10.对BFC的理解

BFC是为了解决以下几个问题：

​		<1>.margin重叠

​		<2>.高度塌陷

​		<3>.创建自适应两栏布局

> 如果要实现两栏布局，左边设置``float:left``，右边``overflow:hidden``，这样右边就不会触发BFC，BFC区域不会与浮动元素发生重叠。

### 11.什么是margin重叠

两个块级元素的上外边距和下外边距可能会合并为一个外边框，大小取决于外边距最大的那个，这就照成了margin重叠。



### 12.元素的层叠顺序

背景/边框  —>  z-index:值  —>  块级盒  —>  浮动盒  —>  行内盒  —>  z-index:0  —>  z-index:正值

![image-20210813225106382](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210813225106382.png)

