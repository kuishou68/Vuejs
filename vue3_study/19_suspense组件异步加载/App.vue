<template>
    <div class="app">
        <h3>APP组件(父)</h3>
        <!--Supence 本质上是使用slot插槽实现的-->
        <Suspense>
            <template v-slot:default>
                <Child />
            </template>
            <template v-slot:fallback>
                <h3>加载中...</h3>
            </template>
        </Suspense>
    </div>
</template>

<script>
// 静态引入
// import Child from './components/Child'
// 引入异步组件
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child')) // 异步引入

export default ({
    name: 'App',
    components:{Child}
})
</script>

<style>
    .app{
        background-color: aqua;
        padding: 10px;
    }
</style>