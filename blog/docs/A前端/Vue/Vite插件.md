# 插件顺序

- 别名处理
- 用户插件设置 enforce：‘pre'
- vite核心插件 (单文件处理)_
- 用户插件未设置enforce
- vite构建插件
- 用户插件设置 enforce：‘post'
- vite构建后置插件（minify,manifest,reporting）



## vite-plugin-mock

给开发服务器实例（connect）配置中间件，该中间件可以存储用户配置接口映射信息，并提前处理输入请求，如果请求的url和路由表匹配则接管，按用户配置的handler返回结果.

[vite2内置connect服务](https://github.com/senchalabs/connect#readme)

```javas
const path = require('path');
let mockRouteMap = {};
function createRoute(mockConfList) {
    mockConfList.forEach(mockConf => {
        let method = mockConf.type || 'get'
        let path = mockConf.url;
        let handler = mockConf.response;
        let route = { 
            path,
            method: method.toLowerCase(),
            handler
         }
         if(!mockRouteMap[method]) {
            mockRouteMap[method] = []
         }
         mockRouteMap[method].push(route)
    });
}

function matchRoute(req) {
    let url = req.url;
    let method = req.method.toLowerCase();
    let routeList = mockRouteMap[method];
    return routeList && routeList.find((item) => item.path === url)
}
// function send(body) {
//     let chunk = JSON.stringify(body);
//     if(chunk) {
//         chunk = Buffer.from(chunk, 'utf-8');
//         this.setHeader('Content-Length', chunk.length);
//     }
//     this.setHeader('Content-type', 'application/json');
//     this.statusCode = 200;
//     this.end(chunk, 'utf-8');
// }

export default function(options = {}){
    const defaultOptions = {
        entry: path.resolve(__dirname, './mock/index.js')
    }
    options = Object.assign(defaultOptions, options)
    return {
        configureServer: function({ app }) {
            // 定义路由表
            const mockObj = require(options.entry);
            createRoute(mockObj);
            const middleware = (req, res, next) => {
                let route = matchRoute(req);
                if(route) {
                    const data = route.handler(req, res)
                    res.end(JSON.stringify(data));
                } else {
                    next();
                }
            }
            app.use(middleware)
        }
    }
}
```

**使用**

mock/index.js

```
module.exports =  [
    {
      url: '/api/users',
      method: 'get',
      response: () => {
        return {
          code: 20000,
          message: 'ok',
          data: [{
            name:'tom'
          },
          {
            name:'jerry'
          }],
        };
      },
    },
  ];
```

vite.config.js

```javas
import { defineConfig } from 'vite'
import viteMockServe from './plugins/vite-plugin-mock';

export default defineConfig({
  plugins: [
    viteMockServe()
    ]
})
```



vue-plugin-