## npm 常用命令详解
[腾讯npm文档](https://www.npmjs.cn/cli/build/)  

配置：
```text
# taobao镜像源
npm config set registry https://registry.npm.taobao.org

# npnjs镜像源
npm config set registry http://registry.npmjs.org/
```

**npm install [-g] <package>**: 安装包  

**npm uninstall [-g] <package>**: 卸载包  

**npm bugs <package>**: 查看package对应github上的issue  

**npm bin [-g|--global]**:列出 npm 安装可执行文件的文件夹

**npm start [-- <args>]**:在 package.json 文件中定义的 "scripts" 对象中查找 "start" 属性,
如果此属性定义了任何命令则执行之。 如果 "scripts" 对象中没有定义 "start" 属性， 默认执行 node server.js 命令。  
**npm cache** :   
```text
npm cache add <tarball file>
npm cache add <folder>
npm cache add <tarball url>
npm cache add <name>@<version>
npm cache clean [<path>]
npm cache verify
```
1. 关于npm cache  
NPM会把所有下载的包保存，放在用户文件夹下面，在我的windows10机器上是保存在C:\Users\zcche\AppData\Roaming\npm-cache下面

2. 关于package.lock.json  
NPM install之后会计算每个包的sha1值，然后将包与他的sha1值关联保存在package.lock.json里面  
下次NPM install的时候会根据package.lock.json里面保存的sha1值去文件夹C:\Users\zcche\AppData\Roaming\npm-cache里面寻找包文件，如果存在，就不用再次从网上下载安装报了

3. NPM cache verify
目测这个命令是重新计算C:\Users\zcche\AppData\Roaming\npm-cache下的文件是否与sha1值匹配，如果不匹配可能删除？

4. NPM cache clean --force
这个命令从C:\Users\zcche\AppData\Roaming\npm-cache下删除所有缓存文件

**坑：**  
NPM不同版本算出来的sha1貌似不完全一样，所以直接用别人的package.lock.json会报sha1不匹配的error

**解决办法：**  
1. 不使用别人的package.lock.json  
2. 如果用了，删掉package.lock.json(记得删除回收站里的)，npm cache clear --force，npm install

引用：[npm cache](https://www.cnblogs.com/chen8840/p/10002785.html)

**npm link**:  
两个项目：npm-link-module,与npm-link-example  
现在需要在npm-link-example中直接使用require("npm-link-module")引入
1. 在npm-link-module目录下执行`npm link`， npm-link-module会被链接到`npm prefix -g`对应目录下的node_modules中
2. 在npm-link-example中执行 `npm link npm-link-module`
3. 使用require("npm-link-module")


**npm start**:    
执行以下命令
```text
"test": "node index.js",
    "start": "npm run test --flag=123 -- a,b c"
```
**--flag=123**: 
配置npm_config_flag = 123,通过process.env.npm_config_flag可获取到  
**-- a,b c**:  
通过process.argv 获取为一个数组，如下：  
第一个值为node.exe地址，第二个为当前文件地址，从第三个开始为传入的值
```text
[
  'C:\\Program Files\\nodejs\\node.exe',
  'E:\\learnMaterials\\nice\\Test\\index.js',
  'a,b',
  'c'
]
```
