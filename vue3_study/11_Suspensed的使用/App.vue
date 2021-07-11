<template>
    <h2>AsyncComponent 父级组件的使用</h2>
    <!--Suspense异步组件-->
    <Suspense>
        <template #default>
            <AsyncComponent />
        </template>
        <template v-slot:fallback>
            <h2>Loading</h2>
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
// 引入组件方式： 静态引入和动态引入

// Vue2 中的动态引入组件的写法：
// const AsyncComponent = ()=>import('./components/AsyncComponent.vue')

// Vue3 中的动态引入组件的写法：
// const AsyncComponent = defineAsyncComponent(
//     () => import('./components/AsyncComponent.vue')
// )

// 静态引入组件
// import AsyncComponent from './components/AsyncComponent.vue' 
import AsyncAddress from './components/AsyncAddress.vue'
export default defineComponent({
    name: 'App',
    // 注册自定义的组件
    components: {
        // AsyncComponent
        AsyncAddress
    }
})
</script>
