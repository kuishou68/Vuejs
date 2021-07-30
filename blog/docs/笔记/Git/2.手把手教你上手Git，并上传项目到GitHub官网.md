---
title: 手把手教你上手Git并上传项目到GitHub官网
date: 2020-05-28
---

手把手教你上手Git，并上传项目到GitHub官网
------------------------
## 1. 入门篇

##### 1.1、**Learning Git Branch**: 
学习 Git 最好的游戏及教程 https://learngitbranching.js.org

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddb39a29797a414181d33d1e662dd3fd~tplv-k3u1fbpfcp-zoom-1.image)  

##### 1.2、👆这是一个趣味俱佳的 Git 动画闯关游戏！
无论对于新人而言，还是老手来讲，都能从中受益，更能理解 Git 的核心，是我觉得的最好的关于学习 Git 的教程。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42b230ce8943489288af8b0f77473cbe~tplv-k3u1fbpfcp-zoom-1.image)  

##### 1.3、做到这里是不是发现后面的越来越难，有种想看标准答案的欲望？
好的，满足你，控制台输入：`show solution` 可查看答案！

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad0d95dd41e24972b2688d874a493e66~tplv-k3u1fbpfcp-zoom-1.image)

## 2.实战篇

##### **2.1、安装环境、启动**
**2.1.1**、安装Git for Windows 下载地址: https://git-for-windows.github.io/  

**2.1.2**、安装步骤：一直next直到Finish。  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71efa33ac8fb4350ba1b1d512778c2e7~tplv-k3u1fbpfcp-zoom-1.image) 

##### **2.2、本地仓库初始化**

**2.2.1**、初始化仓库：`git init`

**2.2.2**、查看仓库状态： `git status`

**2.2.3**、防止中文文件乱码：`git config --global core.quotepath false`  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e17728bc0ce541388e5ad668870b804d~tplv-k3u1fbpfcp-zoom-1.image)  

**2.2.4**、提交所有文档：`git add -A`  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72499911a0a24eb9849224305dfed957~tplv-k3u1fbpfcp-zoom-1.image)  

**2.2.5**、输入GitHub官网注册的

**2.2.6**、用户名：`git config --global user.name "你的用户名"`

**2.2.7**、邮箱：`git config --global user.email "你的邮箱"`

**2.2.8**、生成ssh key: `ssh-keygen -t rsa -C "你的邮箱"`  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3200c60ca6340958f100efb6cff6328~tplv-k3u1fbpfcp-zoom-1.image)

**2.2.9**、在c/Users/Administrator/.ssh/id\_rsa)文件找到直接复制ssh key  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62581bcb85c046458a3eed5bf73197c0~tplv-k3u1fbpfcp-zoom-1.image)  

**2.2.10**、连接github  

**2.2.11**、打开GitHub 进入setting找到ssh key并新建  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7865a723a257495c9d5f58aa21471a75~tplv-k3u1fbpfcp-zoom-1.image)  
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c204eae1df043a5a534489e16695b27~tplv-k3u1fbpfcp-zoom-1.image)  
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d3fe4371d6348a9b7e34f689e75cef4~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cac89dd8f154367b5d9dd321093a24c~tplv-k3u1fbpfcp-zoom-1.image)  

**2.2.12**、测试是否连接成功：`ssh -T git@github.com`  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69542a6febbd4a0092abbc49e981a963~tplv-k3u1fbpfcp-zoom-1.image)  
##### **2.3、Github官网创建远程仓库**

**2.3.1**、新建仓库  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/012ef37851db4bd3869fde5458df1550~tplv-k3u1fbpfcp-zoom-1.image)  

**2.3.2**、自定义仓库名  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70eaefc0f43f4fd3a85074ab6c2c74cd~tplv-k3u1fbpfcp-zoom-1.image)  

**2.3.3**、本地连接到GitHub上面的仓库  

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/043bddaa46064b40b5746ad9d333998a~tplv-k3u1fbpfcp-zoom-1.image)  

**2.3.4**、关键的一步来了，认真看！ 

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9627ef8ae7744b98949270099a16feef~tplv-k3u1fbpfcp-zoom-1.image)  

##### **2.4、再次回到本地仓库，按照下面的步骤一个个来！**

**2.4.1**、创建一个 README.md 用于描述项目：`git add README.md`

**2.4.2**、提交一下：`git commit -m "第一次上传" `

**2.4.3**、创建新的分支 `git branch -M main`

**2.4.4**、远程连接 你复制的SSH keys: `git remote add origin git@github.com:kuishou68/React.git`

**2.4.5**、push你整个项目：`git push -u origin main`

**2.4.6**、等待上传完毕刷新你的GitHub就OK了！

**如果新建多了仓库不知道怎么删除？**  
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/744b267245424b48aa5b98a9e4d65899~tplv-k3u1fbpfcp-zoom-1.image)  
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ade55351d7c456fbb99cf4f5fcced0b~tplv-k3u1fbpfcp-zoom-1.image)  
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dd0149cebe94b7ab36d87d29d579656~tplv-k3u1fbpfcp-zoom-1.image)  
结束，撒花！！🎉🎉🎉

> 本文使用 [文章同步助手](https://juejin.cn/post/6940875049587097631) 同步