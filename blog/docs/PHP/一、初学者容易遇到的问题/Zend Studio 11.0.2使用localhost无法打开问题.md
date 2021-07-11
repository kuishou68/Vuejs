## 关于Zend Studio 11.0.2使用localhost无法打开问题，附解决步骤

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