---
title: 同一个项目能上传至  多个GitHub账号或Gitee的仓库嘛？
date: 2021-07-11
---

>目前我有两个github账号，一个码云账号， [kuishou68](https://github.com/kuishou68) 存放个人项目，[ lingxiu58](https://github.com/lingxiu58)工作仓库，还有个码云的工作仓库  [领秀5858](https://gitee.com/lingxiu5858)。现在我想把本地的项目分别上传到这三个仓库，并且互不干扰，应该怎么实现呢？

#### 1、在 `C:\Users\Administrator\.ssh` 文件夹中创建一个config文件（无扩展名），填入以下内容：
````# default
Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa

# lingxiu58(自定义)
Host lingxiu58.github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_lingxiu58

# lingxiu5858(自定义，我习惯和账户名保持一致)
Host lingxiu5858.gitee.com
    HostName gitee.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_lingxiu5858
````



#### 2、分别测试ssh是否能连接到github:

``ssh -T git@github.com``

``ssh -T git@lingxiu58.github.com``

``ssh -T git@lingxiu5858.github.com``


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41bdba90e56047c1a70fde54ca739f7e~tplv-k3u1fbpfcp-watermark.image)
#### 3、对 lingxiu58 账号下的仓库单独配置用户名和邮箱，进入项目文件夹：

`git config user.name "lingxiu58"`

`git config user.email "123456789@qq.com"`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f5c01967fb347ed9cfeb9bfcc465667~tplv-k3u1fbpfcp-watermark.image)

#### 4、修改远程仓库的地址

`git remote rm origin`

`git remote add origin git@lingxiu5858.github.com:lingxiu5858/<你的仓库名>.git`

`git push -u origin master/main` （gitee用master/github用main）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0433f5adcec448248a2dd29a03aceccd~tplv-k3u1fbpfcp-watermark.image)

#### 5、完事儿！

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8caf240cb22e4e7d910d1c505ecd7aeb~tplv-k3u1fbpfcp-watermark.image)

