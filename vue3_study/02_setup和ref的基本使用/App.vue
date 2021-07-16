<template>
    <h2>setup和ref的基本使用</h2>
    <h3>{{ count }}</h3>
    <button @click="updateCount">更新数据</button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'App',
    // vue2的方式实现---------------------
    // data (){
    //     return {
    //         count: 0,
    //     }
    // },
    // methods: {
    //     updateCount(){
    //         this.count++
    //     },
    // },
    // vue3的方式实现--------------------
    setup() {
        // 变量、数据
        let count = ref(0)
        function updateCount() {
            count.value++
        }
        // 返回一个对象，把数据return出去
        return {
            // 属性
            count,
            // 方法
            updateCount
        }
        // 返回渲染函数
        // return ()=> h('h1','魁首')
    }
})
</script>
