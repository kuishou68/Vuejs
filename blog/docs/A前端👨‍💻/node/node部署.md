## pm2 部署项目
1. 启动node项目

2. 配合http-server开启服务
```javascript
    // http-server路径：例如：/root/node/node-v10.9.0/bin/http-server
   pm2 start http-server路径 --name 名称 -- 项目文件夹 -p 端口 -d false
```