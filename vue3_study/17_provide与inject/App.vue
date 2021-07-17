<template>
    <div class="app">
        <h3>APP组件（祖）,{{name}}--{{price}}</h3>
        <Child />
    </div>
</template>

<script>
import Child from './components/Child.vue'
import { reactive, provide ,toRefs} from 'vue'
export default ({
    name: 'App',
    components:{Child},
    setup(){
        /**
         * provide 与 inject 
         * provide 提供  
         * inject 注入
         */
       let car = reactive({name:'福特',price:'50W'})
       provide('car',car) // 给后代组件床底数据
       return{...toRefs()}
    }
})
</script>

<style>
    .app{
        background-color: aqua;
    }
</style>