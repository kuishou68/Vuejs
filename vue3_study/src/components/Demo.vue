<template>
  <h1>求和为：{{ sum }}</h1>
  <button @click="sum++">点我+1</button>
  <hr>
  <h2>当前鼠标点击的坐标为：x->{{point.x}};y->{{point.y}}</h2>
</template>

<script>
import { ref } from 'vue'
import usePoint from '../hook/usePoint'
export default {
    name: 'Demo',
    setup(){
        // 数据
        let sum = ref(0)
        let point = usePoint()
        /**
         * 什么是 hook ? ----本质上是一个函数，把setup中使用的Composition API 进行数据封装。
         * 类似于 vue2.x 中的 mixin。
         * hook 的幼师：复用代码，让setup中的逻辑清除易懂。
         * */
        
        // 返回一个对象（常用）
        return{ sum, point }
    },
}
</script>

