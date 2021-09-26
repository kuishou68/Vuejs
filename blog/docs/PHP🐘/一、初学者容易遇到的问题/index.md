## 前言
PHP初学者遇到的问题

##  1.PHP乱码怎么办？五种方法彻底解决PHP乱码问题?

对于刚接触PHP的新手来说，乱码可能会让你边临崩溃，但是你要习惯，既然想学好PHP，乱码是家常便饭，不管是老鸟还是新手，都会遇到乱码的问题，下面是我总结的几个常见并且有效的解决方法：

**方法一：检查HTML文件是否加入UTF-8（国际化编码）：UTF-8是没有国家的编码，独立于任何一种语言，任何语言都可以用。**

```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190419160350860.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_20,color_FFFFFF,t_70)
**方法二：检查HTML和PHP混合页面是否加入UTF-8**

```
	<?php 
    	//声明文件解析的编码格式
        header('Content-type:text/html;charset=utf-8');
	?>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190419160922956.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

**方法三：检查MySql和PHP混合页面是否加入UTF8,注意，这里是UTF8,  不是UTF-8,  中间是没有 ‘-’ 的！**

```
	<?php 
    	mysql_query('SET NAMES UTF8');
	?>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190419161431894.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_20,color_FFFFFF,t_70)
**如果是高版本，可以像这样写**

```
<?php 
    $link = mysqli_connect('localhost','root','root');//连接数据库
    mysqli_set_charset($link,'uf8');                //设置字符集
?>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019041916184535.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
**方法四：Window →Preferences →General →Worspace →Other:UT-8**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190419162425462.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20190419162516209.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
**方法五：进入phpStudy目录下的MySql,用记事本打开my.ini文件**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190419163346610.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190419163556742.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190419163845380.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190419163924813.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
**最后点击保存，重启zend studio就行了**



##  2、关于Zend Studio 11.0.2使用localhost无法打开问题，附解决步骤

前段时间一直想搭建PHP学习环境，百般挑选之下，选择了Zend Studio+phpStudy，可是下学习过程中遇到无法打开localhost的问题，逛了很久的CSDN，看了很多大佬们提供的解决方案，都没解决，其实好好想一下，最终原因还是我们本机电脑的localhost的端口与phpStudio端口不符导致的，我这里带大家找到自己的localhost端口
下面是我提供的步骤：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190329114755510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

**（1）打开phpStudy，点击‘其他选项菜单**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190202210315856.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
**（2） 点击My HomePage，会跳转到你本机的localhost**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190329113355618.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
**（3） 可以看到在地址栏出现了我们的http://localhost:9096/**
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019032911365264.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

（4）**好了，找到我们的localhost端口号，就是9096了，不同的电脑端口号可能不同，这时我们需要注意，既然你的端口号不同，打开localhost的方式肯定不能像以往一样直接输入localhost或者172.0.0.1，而是需要在localhost后面输入：9096**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190329114933213.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
