## npm包文件描述  
+ bin: 用于存放可执行二进制文件的目录。
+ lib: 用于存放JavaScript代码的目录。
+ doc: 用于存放文档的目录。
+ test: 用于存放单元测试用例的代码。
+ package.json: 包文件描述文件。
   
## package.json
```javascript
let packageJson = {
  "name": "npmpackage",  // 包名
  "version": "1.0.0",    // 版本号
  "description": "npm包规范简介",  //包简介
  "keywords": ["npm", "description"], // 关键字数组
  "maintainers":[{"name":"YwY", "email": "xxx@qq.com", "web":"xxx.com"}], //包维护者列表
  "bugs":"XXX.com", //一个可以反馈bug的网页或者邮箱
  "contributors": [], //贡献者列表
  "license": "ISC", // 许可证
  "repository": {}, //托管源代码的位置列表
  "main": "index.js", //模块主入口，若不存在默认在包目录在查找index.js、index.node、 index.json
  "bin": {
    "npmpackage":'./bin/index'
  },  //将包作为命令行工具使用，使用npm intall <package_name> -g 将脚本加入执行路劲中。
  "scripts": {  //脚本说明对象，主要被包管理器用来安装、编译、测试和卸载包。
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "homepage": "http://127.0.0.1/homepage",  //当前包的网站地址
  "os": [], //操作系统支持列表
  "cpu": [], // CPU架构支持列表
  "engines": {  //支持的JavaScript 引擎列表

  },
 "builtin":false, //当钱包是否是内建在底层系统的标准组件
 "directories":"", //包目录说明
}
``` 

## 发布包
+ 注册仓库账号：`npm adduser`
+ 上传包： `npm publish`
    + 管理包权限：`npm owner` 
    + 查看：`npm owner ls <package name>`.
    + 添加：`npm owner add <user> <package name>`
    + 删除：`npm owner rm <user> <package name>`

## 关于一些发布的坑
[踩坑博客](https://blog.csdn.net/zhangjing1019/article/details/102896421)
