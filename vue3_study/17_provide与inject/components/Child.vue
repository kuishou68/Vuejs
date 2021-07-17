<template>
    <div class="app">
        <h3>Child组件（祖）</h3>
        <Son />
    </div>
</template>

<script>
import {inject} from 'vue'
import Son from './Son.vue'
export default ({
    name: 'Child',
    components:{Son},
    setup(){
        /**
         * provide 与 inject 
         * provide 提供  
         * inject 注入
         */
        let x = inject('car')
        console.log(x,'Child-------')
    }
})
</script>

<style>
    .app{
        background-color: fuchsia;
        padding: 10px;
    }
</style>