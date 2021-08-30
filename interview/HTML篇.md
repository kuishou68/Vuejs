# 2021 HTML面试题

### 1.src和href的区别

- scr用于替换当前元素，href用于在当前文档和外部资源之间建立联系。

```html
<script src="main.js"></script>
```

```html
<link href="style.css" rel="stylesheet" />
```



### 2.对HTML语义化的理解

根据内容的结构化，选择合适的标签，通俗来讲，就是用正确的标签做正确的事。

```html
<header>头部</header> 
<nav>导航栏</nav>
<section>区块</section>
<main>主要区域</main>
<article>主要内容</article>
<aside>侧边栏</aside>
<footer>底部栏</footer>
```



### 3.script标签中defer 和 async 的区别

- async 表示**后续文档**与**JS脚本**是异步执行的，多个带有async属性的标签，不能保证加载的顺序；
- defer表示**JS脚本**需要等待**文档加载完成之后**才能加载，多个带有defer属性的标签能够按照顺序执行。

![image-20210813213730169](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210813213730169.png)

#### 4.HTML5 有那些更新的地方

**<1>.语义化标签**：

​		header: 头部、footer：尾部、nav：导航栏、aside: 侧边栏、section：主要区域、article：主要内容

**<2>.媒体标签**：

​		audio: 音频、video: 视频

**<3>.表单**：

​		email、url、number、search、range、color...

**<4>.DOM查询操作**：

```javascript
document.querySelect()

document.querySelectAll()
```

**<5>.拖放、canvas、SVG、定位**

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```



### 5.行内元素有哪些？快级元素有哪些？空元素有哪些？

行内元素：``a b span img input select strong``

快级元素： ``div ul li dl dt dd h1-h6 p``

空元素：常见的有：、``、``、``、``、``；



### 6.Canvas 和 SVG 的区别

**SVG**:  在SVG中，每个被绘制的图形均被视为对象，如果SVG对象属性发生改变，那么浏览器会自动重绘图形。

**Canvas**: 画布，通过JS来绘制2D图形，逐像素渲染，位置发生改变时，需要重绘。