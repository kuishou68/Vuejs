![](https://pic2.zhimg.com/v2-994ad4cf8d58fa8eefb16317d269f96b_b.jpg)

> **💻1、keep-alive是什么？**
>
> keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，避免被重新渲染！可以理解成防弹衣🧥;
>
> 包含在keep-alive里面的组件，所有路径匹配到的视图都会被缓存。

```
<keep-alive>
	<router-view>
		<!-- 所有路径匹配到的视图组件都会被缓存！ -->
	</router-view>
</keep-alive>
```



> **🖱️2、keep-alive和普通组件有什么不同？**
>
> 渲染方式不同，keep-alive它是一个抽象组件，不会去渲染实体节点，是通过手写一个render函数，render最终返回一个VNode；
>
> 而平时是的模板组件，是利用Vue编译成render函数进行渲染。



> **🍀3、keep-alive 中 render函数怎么实现的？**
>
> 首先会执行created这个钩子函数，render中定义了cache(对象)、keys(数组)两个变量，用于接收缓存。

```javascript
render () {
    // 拿到默认插槽，这个插槽包含了被keep-alive包裹的所有内容
    const slot = this.$slots.default
    // 拿到第一个组件节点的VNode
    const vnode: VNode = getFirstComponentChild(slot)
    // 拿到第一个组件节点的componentOptions
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOption
    s
if (componentOptions) {
    // 拿到组件节点的名称getComponentName
    const name: ?string = getComponentName(componentOptions)
    const { include, exclude } = this
    if (
        // 匹配不到 included ，不需要对它做缓存
        (include && (!name || !matches(include, name))) ||
        // 组件名在 excluded 返回
        (exclude && name && matches(exclude, name))
    ) {
        // 如果都不在，说明当前组件是不需要缓存的，直接返回VNode，跟没用keep-ailve是一样的
        return vnode
    }
    // 拿到cache 和 keys，对VNode建立一个缓存
	const { cache, keys } = this
    // 定义VNode的Key
    const key: ?string = vnode.key == null
    // 同一个构造函数可能会被注册为不同的本地组件
    // 只有cid还不够，对其进行拼接,componentOptions组件的cid+tag，拼接成key
    ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions
    .tag}` : '')
    : vnode.key // 返回VNode的key
    // 如果命中了缓存
    if (cache[key]) {
        // 将VNode的componentInstance 指向 ==> 缓存的 componentInstance
        vnode.componentInstance = cache[key].componentInstance
        // 移除掉旧的key,push到新的keys中
        remove(keys, key)
        keys.push(key)
    } else {
        cache[key] = vnode
        keys.push(key)
        // 清理缓存
        if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
    }
    vnode.data.keepAlive = true
}

```



> **🌵4、keep-alive 独有的两个生命周期：**
>
> activated & deactivated 两个钩子函数是专门为 ``keep-alive`` 组件定制的钩子，在渲染期间不被调用；
>
> activated() : 被  ``keep-alive`` **激活**时调用。
>
> deactivated() : 被  ``keep-alive`` **停用**时调用。



