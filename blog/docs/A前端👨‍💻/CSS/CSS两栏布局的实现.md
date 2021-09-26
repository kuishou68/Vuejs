## 怎么实现左边固定，右边自适应的网页布局？

类似于后台管理系统，侧边栏固定，右边自适应网页布局！[查看演示效果](https://zhuqingguang.github.io/vac-works/cssLayout/index1.html)

![image-20210804103915277](https://pic4.zhimg.com/80/v2-c631a79179b1088f134ea89098a0087d_720w.png)

### 1、``flex`` 方案 （最佳方案）

```css
.box{
    margin: 0;
    padding: 0;
    align-items: flex-start; /*让左右两个盒子高度自动*/
}
.left{
    flex: 0 0 200px;  /*flex-grow（放大比例，默认位0） flex-shrink(缩小比例，默认位1) flex-basis(分类剩余空间之前，占据的主轴空间，默认值auto)*/
    background-color: red;
}
.right{
    flex: 1 1 auto;
    background-color: blue;
}
```



### 2、``float + margin-left``方案

```css
.box{
    margin: 0;
    padding: 0;
    overflow: hidden;/*清除浮动，超出部分隐藏*/
}
.left{
    width:200px;
    float: left; /*左边用浮动固定*/
    background: red;
}
 .right{
    width: 100%;
    margin-left: 200px;/*右边容器占了左边的200px空间，但是content内容并没有占用左边的*/
    background: blue;
}
```



### 3、``float + BFC`` 方案

```css
.box{
    overflow: auto;
}
.left{
    float: left;
    width: 200px;
    background: red;
}
.right{
    margin-left: 0;
    overflow: auto; /*形成了 BFC , 因此右侧盒子不会与浮动元素重叠*/
    background: blue;
}
```



### 4、双 ``float`` 方案

```css
.box{
   overflow: auto;
}
.left{
   float: left;
   width: 200px;
   background: red;
}
.right{
   float: right;
   width: calc(100% - 200px);
   background: blue;
}
```



### 5、``grid`` 方案

```css
.box{
   display: grid;/*网格布局*/
   grid-template-columns: 120px 1fr;/*列属性：*/
   align-items: start; /*交叉轴start顶部对齐*/
}
.left{
   box-sizing:border-box; /*元素设定的宽度和高度决定了元素的边框盒*/
   grid-column: 1; 
   background: red;
}
.right{
   box-sizing:border-box;
   grid-column:2;
   background: blue;
}
```



### 6、双``inline-block``方案

```css
.box{
	font-size:0;
}
.left, .right{
	display:inline-block;
	vertical-align: top;/* 相对基线的顶部对齐 */
	box-sizing:border-box;
}
.right{
	width:calc(100% - 200px);/*calc()函数用于动态计算长度值*/
}
```

参考：

[[七种实现左侧固定，右侧自适应两栏布局的方法]](https://segmentfault.com/a/1190000010698609#item-3)

[CSSBFC规则的应用自适应两栏布局、双飞翼布局](https://zhuanlan.zhihu.com/p/110063355)