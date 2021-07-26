> **1、Vuex 的基本使用**



> **2、Store 的实例化过程**
>
> State 提供了唯一的公共数据源，所有共享的数据都要统一放到Store 的 State中进行存储。

```javascript
// 创建store数据源，提供唯一的公共数据
const store = new Vuex.Store({
    // state 指向一个对象， 对象中的数据就是需要全局共享的数据
	state: { count:0 }
})
```

- 组件访问State 中数据的两种方式:

```javascript
// 第一种
$store.state.count（全局数据名称）
```

```javascript
// 第二种，从 vuex 中按需导入 mapState 函数
import { mapState } from 'vuex'
// 将全局数据，映射为当前组件的计算属性
computed: {
	...mapState(['count'])
}
```



> **总结：**store 就是一个数据仓库，为了更方便的管理仓库，把一个大的store拆成小的  modules ；
>
> 整个 moudles 是一个树形结构，每个module又分别定义了 state，getters，mutations，actions；
>
> 通过递归便利模块的方式，完成了他们的初始化。



> Vuex 提供这些API都是方便对store做各种操作来完成各种能力，尤其是 mapXXX 的设计。





> **Vuex插件的设计**





> **Logger 插件的实现原理**
>
> 



