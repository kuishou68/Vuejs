vue源码分析
## 项目结构
### 1. 整体目录
```text
vue
├── BACKERS.md  
├── benchmarks      # 性能测试文件
├── dist            # 打包文件
├── examples        #  案例
├── flow            # 类型检测
├── LICENSE         # 开源协议
├── package.json    
├── packages        # 平台相关的包 
├── README.md       
├── scripts         # 工程化脚本
├── src             # 核心文件
├── test            # 测试文件
├── types           # TS声明文件
└── yarn.lock

```
### 2. src目录
```text
├─compiler                  # 编译的相关逻辑   
│  ├─codegen         
│  ├─directives
│  └─parser
├─core                      # vue核心代码   
│  ├─components             # vue中的内置组件 keep-alive
│  ├─global-api             # vue中的全局api
│  ├─instance               # vue中的全局api
│  │  └─render-helpers
│  ├─observer               # vue中的响应式原理
│  ├─util
│  └─vdom                   # vue中的虚拟dom模块
│      ├─helpers
│      └─modules
├─platforms                 # 平台代码
│  ├─web                    # web逻辑 - vue
│  │  ├─compiler
│  │  │  ├─directives
│  │  │  └─modules
│  │  ├─runtime
│  │  │  ├─components
│  │  │  ├─directives
│  │  │  └─modules
│  │  ├─server
│  │  │  ├─directives
│  │  │  └─modules
│  │  └─util
│  └─weex                   # weex逻辑 - app
│      ├─compiler
│      │  ├─directives
│      │  └─modules
│      │      └─recycle-list
│      ├─runtime
│      │  ├─components
│      │  ├─directives
│      │  ├─modules
│      │  └─recycle-list
│      └─util
├─server                    # 服务端渲染模块
│  ├─bundle-renderer
│  ├─optimizing-compiler
│  ├─template-renderer
│  └─webpack-plugin
├─sfc                       # 用于编译.vue文件
└─shared                    # 共享的方法和常量

```
## 打包流程
> 将代码组织起来   

**PS:** vue2 与 vue3使用的都是rollup进行打包

package.json
```json
{
    "script": {
        "build": "node scripts/build.js",
        "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
        "build:weex": "npm run build -- weex"
    }
}
```
**build.js:**
```javascript
let builds = require('./config').getAllBuilds()

// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}
```
获取配置文件
