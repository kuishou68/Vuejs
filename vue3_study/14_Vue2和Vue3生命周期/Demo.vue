<template>
  <h1>求和为：{{ sum }}</h1>
  <button @click="sum++">点我+1</button>

</template>

<script>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
export default {
    name: 'Demo',
    setup(){
        // 数据
        let sum = ref(0)
        // 通过组合式API 的形式使用生命周期钩子
        // 组合式API 中钩子的执行时机要比 配置项中的API 快，
        // 要么全部用组合式 API , 要么用配置项中的API
        onBeforeMount(()=>{
            console.log('---onBeforeMount---')

        })
        onMounted(()=>{
            console.log('---onMounted ---')

        })
        onBeforeUpdate(()=>{
            console.log('--- onBeforeUpdate---')

        })
        onUpdated(()=>{
            console.log('--- onUpdated---')

        })
        onBeforeUnmount(()=>{
            console.log('--- onBeforeUnmount---')

        })
        onUnmounted(()=>{
            console.log('--- nUnmounted---')
        })
        // 返回一个对象（常用）
        return{ sum }
    },
    // 通过配置项的形式使用生命周期钩子
    //#region
    // beforeCreate(){
    //     console.log('--beforeCreate---')
    // },
    // created(){
    //     console.log('--created---')
    // },
    // beforeMount(){
    //     console.log('--beforeMount---')
    // },
    // mounted(){
    //     console.log('--mounted---')
    // },
    // beforeUpdate(){
    //     console.log('--beforeUpdate---')
    // },
    // updated(){
    //     console.log('--updated---')
    // },
    // beforeUnmount(){
    //     console.log('--beforeUnmount---')
    // },
    // unmounted(){
    //     console.log('--unmounted---')
    // }
    //#endregion

}
</script>

