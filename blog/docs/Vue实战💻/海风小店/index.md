## 前言
海风小店

## 搭建一款开源的微信商城小程序：海风小店 

**准备工作**

- 申请小程序账号

申请小程序账号只需要按照官网文档说明操作即可，这里我就不展开说了，地址：https://developers.weixin.qq.com/miniprogram/introduction/

- 官网下载GitHub三个文件 

  服务端： https://github.com/iamdarcy/hioshop-server  
  微信小程序：https://github.com/iamdarcy/hioshop-miniprogram

  管理端：GitHub: https://github.com/iamdarcy/hioshop-admin
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/05c86f9517f17fda09a109909ccc2fde.png#pic_center)

- 安装顺序：  

  服务端  ==>  小程序  ==>  管理端    

  server  ==>  miniprogram  ==>  admin



**服务端 ：本地开发环境配置**

- 创建数据库hiolabsDB（注意数据库字符编码为utf8mb4），并导入项目根目录下的hioshop.sql  

  注意数据库版本一定要是 **MySql 5.7**  一定要是 **MySql 5.7**   一定要是 **MySql 5.7**

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/5f8bcb5fde448ae520187bd5cef8f030.png#pic_center)


- 更改数据库配置  src/common/config/database.js

![image-20210509224232810](https://img-blog.csdnimg.cn/img_convert/683c369d4cf75286071874e3465386a4.png)

- 填写微信配置和其他设置，打开 src/common/config/config.js文件，如果微信支付、oss服务什么的你都还没申请，都可以先不填写，但是微信的appid 和secret 是必填的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210510000142718.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70#pic_center)

- 微信的appid 和secret 在微信小程序官网登录以后，在控制台页面的开发->开发设置->开发者ID中
  ![image-20210509231238114](https://img-blog.csdnimg.cn/img_convert/92ce1dd2cec9613f7c2479eb2f157839.png)

- 填写七牛云地址  src/common/config/config.js
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/9d58d154be8e12f2c8bca32f7bf5ce0e.png#pic_center)

- 安装依赖``npm install``

- 启动  ``npm start``

  没报错的话，会在控制台显示200 

![image-20210509224618728](https://img-blog.csdnimg.cn/img_convert/d89f90774242fa02f26ef97aefd0924e.png)

	浏览器测试   http://127.0.0.1:8360/  

![image-20210509224551447](https://img-blog.csdnimg.cn/img_convert/6c4659a6deccbbf873eaccd0ecb1f98d.png)

------------------------------------------------------------------------------------------------------------------

**小程序端 ：本地开发环境配置**

- 打开微信开发者工具

![image-20210509230236475](https://img-blog.csdnimg.cn/img_convert/0f2f46498ec0bee6680062f1ba05aca6.png)

- 默认API改成本地地址![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/05cbf735e4a1813e1e009e3af6106c97.png#pic_center)

  小程序预览显示数据表示数据库连接成功



--------------------------------

**服务端 ：本地开发环境配置**

- 安装依赖后启动后会出现一个问题，这个问题是Element-ui自带的。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/ff371904b5c41de0607ecc73b942f214.png#pic_center)


- 解决方法：在node_modules 搜索:  div class="el-form-item__label-wrap" 
  ![image-20210505000052259](https://img-blog.csdnimg.cn/img_convert/3b1681b3e2d7ac8fe0c539660110d88b.png)

- 在语句中加上单引号就可以了
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/580d4d51547f108d37646a42f9a4b58d.png#pic_center)
  修改之后
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/877483914dbf680e7912f2df8691e705.png#pic_center)

- 启动 ``npm run dev``
  ![image-20210509225447399](https://img-blog.csdnimg.cn/img_convert/56a993b81a0c4334bfb4e59ea7995772.png)

- build 打包成静态文件  ``npm run build:web``

- 此时代表项目启动成功，桌面上会出现下图这个程序界面，输入默认的管理员账号密码：

  用户名：hiolabs，密码：hiolabs
  ![image-20210509225845170](https://img-blog.csdnimg.cn/img_convert/b563f930117211157c54fa4360990bf6.png)

参考：https://mp.weixin.qq.com/s/2lDVMnUJqfenO6MkiL132Q

		   https://blog.csdn.net/GZLEO77/article/details/108627277
	
		   https://www.bilibili.com/video/av89567916

