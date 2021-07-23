![image-20210723191207467](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210723191207467.png)



> ##### **1、Vue-Router三种路由模式：**

- ``hash``：:hash:使用URL hash 值来做路由，``支持所有路由器``；
- ``history``::book:依赖``HTML5 History API``和服务器配置；
- ``abstract``::chains:支持所有JS运行环境，Node.js服务端；

> **1.1、路由作用**：根据不同的路径，来映射到不同的视图；

> **1.2、路由基本使用**：

```html
<div id="app">
	<h1>Hello  kuishou!</h1>
	<p>
        <!--<router-link>默认会被渲染成一个`<a>`标签-->
        <router-link to="/foo">滚去学习 Foo</router-link>
        <router-link to="/bar">赶紧敲代码 bar</router-link>
    </p>
    <!--路由匹配到的组件将渲染在这里-->
    <router-view></router-view>
</div>
```

```javascript
import Vue from 'vue'
import VueRouter from  'vue-router'
// 注册路由
Vue.use(VuerRouter)
// 1.定义组件
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
// 2.定义路由
const routes = [
	{ path: '/foo', components: Foo },
	{ path: '/bar', components: Bar },
]
```



> ##### **2**、**路由注册：**
>
> **2.1、Vue插件的注册原理：** 每个插件都需要实现一个静态的 ``install``  方法，当我们执行 ``Vue.use``  的时候，就会执行这个  ``install``  方法，并且在这个  ``install``  方法中第一个参数拿到  ``Vue`` 对象。





> ##### **3、路由安装：**
>
> Vue-Router 安装最重要的一步就是利用	``Vue.mixin ``   去把  ``beforeCreate``   和  ``destroyed``  两个钩子函数注入到每一个组件中，在beforeCreateed 中定义 私有属性和初始化 路由。

```javascript
// install.js
// 把  _Vue  export 出去，在源码的任何地方都可以访问 Vue
export let _Vue

export function install (Vue) {
    // 判断是否有注册指令，如果多次执行install方法，则会return
  if (install.installed && _Vue === Vue) return
  install.installed = true
    // 使用下划线 _Vue 保留 传过来的Vue
  _Vue = Vue
  const isDef = v => v !== undefined
  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }
  // mixin 作用：把mergeOptions 扩展到全局的 options 
  Vue.mixin({
      // 这样的话，每一个组件都有beforeCreate、destroyed这两个钩子函数
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
```



> #####  **3、VueRouter对象：**
>
> 当我们执行  ``new VueRouter`` 时，``beforeCreated``  钩子函数会执行  ``router.init``   方法，

```javascript
 constructor (options: RouterOptions = {}) {
    this.app = null  // 根 Vue 实例
    this.apps = []   // 保存所有子组件的 Vue 实例
    this.options = options // 保存传入的路由配置
    this.beforeHooks = []  // 钩子函数
    this.resolveHooks = [] // 钩子函数
    this.afterHooks = []   // 钩子函数
    // 路由匹配器
    this.matcher = createMatcher(options.routes || [], this)
    // 路由创建的三种模式: hash、history、abstract
    let mode = options.mode || 'hash'
    // 路由创建失败的回调函数,检测浏览器中有没有历史记录（history）
    this.fallback =
      mode === 'history' && !supportsPushState && options.fallback !== false
    // 路由历史的具体的实现实例, 如果没有则会使用hsah访问
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }
```

 

>##### **4、Matcher** 
>
>路由匹配器，主要通过 ``matcher`` 和 ``match``方法 ，匹配路径  ``Router``  的.

- 4.1、``createRouteMap`` 函数是把用户的  **路由配置**  转换成一张 **路由映射表**，

```javascript
export function createRouteMap (
  routes: Array<RouteConfig>,
  oldPathList?: Array<string>, // 可选参数
  oldPathMap?: Dictionary<RouteRecord>, // 可选参数
  oldNameMap?: Dictionary<RouteRecord>, // 可选参数
  parentRoute?: RouteRecord
): {
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>
} {
  // 路径列表用于控制路径匹配优先级
  const pathList: Array<string> = oldPathList || []
  // $flow-disable-line
  const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
  // $flow-disable-line
  const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)
  // 对路由数组进行遍历
  routes.forEach(route => {
    // 遍历成功·拿到每个路由对象
    addRouteRecord(pathList, pathMap, nameMap, route, parentRoute)
  })
```



- **4.1、createMatcher的初始化逻辑**

> ``createMatcher`` 首先执行的逻辑是 ````const { pathList, pathMap, nameMap } = createRouteMap(routes) ``` 用来创建一个**映射表**。

```javascript
  // 对路由数组进行遍历
  routes.forEach(route => {
    // 遍历成功·拿到每个路由对象
    addRouteRecord(pathList, pathMap, nameMap, route, parentRoute)
  })

```



- **4.3、match 的匹配过程**

> **``match`` 方法作用：**根据传入的 ``raw`` 和当前的路径 ``currentRoute`` 计算一个新的路径并返回。
>
> ``match`` 方法接收3个参数：raw（*Location 对象*）、currentRoute（*当前的路径*）、redirectedFrom（*与重定向相关*）

```javascript
function match (
    raw: RawLocation, // url 字符串,也可以是⼀个 Location 对象
    currentRoute?: Route, // Router 类型，表示当前的路径
    redirectedFrom?: Location // 与重定向相关
  ): Route {
    // 根据 raw ， current 计算出新的 location 
    const location = normalizeLocation(raw, currentRoute, false, router)
    const { name } = location
    // 如果current传入属性有name
    if (name) {
        // 根据nameMap 匹配到 record 
      const record = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        warn(record, `Route with name '${name}' does not exist`)
      }
      // 如果 record 不存在，则匹配失败！
      if (!record) return _createRoute(null, location)
      const paramNames = record.regex.keys
        .filter(key => !key.optional)
        .map(key => key.name)

      if (typeof location.params !== 'object') {
        location.params = {}
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }

      location.path = fillParams(record.path, location.params, `named route "${name}"`)
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {}
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const record = pathMap[path]
        if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }
```



> **5、路径切换**
>
> 发生路径切换的时候，执行的一系列钩子函数。

![image-20210723205053608](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210723205053608.png)

- **5.1、导航守卫的执行流程：**

  Vue项目中，导航被触发后，**失活的组件**(叛变的人)开始调用``beforeRouteLeave`` ，全局守卫（大哥） ``beforeEach`` 、组件内的守卫（三弟）重用组件 ``beforeRouterUpdate``  被逐步触发；路由守卫（二哥）在路由配置里调用 ``beforeEnter`` 后开始解析异步路由组件；在被激活的**目标组件**（敌人）里调用``beforeRouteEnter`` ;全局守卫（大哥）``beforeResolve``检测到目标组件（敌人）被激活（打败），在router.js中查找到需要跳转的导航并被确认，``afterEach``钩子被调用，最终触发DOM更新；路由守卫（二哥）调用 ``beforeRouteEnter``  传给next的回调函数。

```
// 全局守卫
router.beforeEach((to, from, next)=>{
	// 进入路由前首先检查是否登录，如果没有则跳转到登录的视图组件
	if(to.name != 'Login' && !isAuthenticated) next({ 
		name: 'Login'
	// 否则继续下一个脚本
    }) else  {
    	next()
    }
}) 
```

![image-20210723204800587](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210723204800587.png)

参考：https://www.jianshu.com/p/60da87d4ec92

官方文档：[Vue-Router](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)



> **守卫识别路由的三把钥匙：**
>
> to :   即将进入的路由
>
> from ： 即将离开的路由
>
> next :  进行管道中的下一个钩子



面试题：给路由组件**传递数据**有哪几种方式？

> 1、通过 ``params`` 传递

```javascript
// params 不能与 path 一起使用
router.push({ path: './details', parmas: { id: '001'} }) // ->跳转到details
```



> 2、通过 ``query`` 传递

```javascript
this.$router.push({ path: '/details/001', query: { kind: "car" }})
```



> 3、通过 ``hash``传递

```javascript
this.$touter.push({ path: './details001', hash: '#car'})
```

...

参考： [Vue 路由组件传参的 8 种方式](https://segmentfault.com/a/1190000039398462)



- **5.2、URL变化的逻辑**



- **5.3、组件渲染的逻辑**

