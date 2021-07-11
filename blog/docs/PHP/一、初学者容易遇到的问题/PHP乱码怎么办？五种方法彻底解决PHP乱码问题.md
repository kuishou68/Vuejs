# PHP乱码怎么办？五种方法彻底解决PHP乱码问题?

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