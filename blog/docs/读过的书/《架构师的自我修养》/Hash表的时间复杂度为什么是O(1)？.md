# Hash表的时间复杂度为什么是O(1)？

从hash表的结构来看：

hash表是基于**数组**和**链表**来实现的，存储数据是使用的是余数法，即**使用hash表的长度**(8)对**key的hashCode**(101)求余，余数(5)就是数组的下标。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210520181158231.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)


但是，余数法存在一个问题，就是**不同key**可能存在**相同的下标**，比如：101%8=5和109%8=5得到相同的下标（5），这就造成了hash冲突。

为了解决hash冲突，常用的方法就是**链表法**，hash表将**冲突的下标**退化成一条**链表**，链表的时间复杂度为O(N)，所以hash表单的时间复杂度就是O(1)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210520190825679.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)
