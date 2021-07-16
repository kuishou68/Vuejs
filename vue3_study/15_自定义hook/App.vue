<template>
    <button @click="idShowDemo = !isShowDemo">切换隐藏/显示</button>
    <Demo  v-if="isShowDemo" />
</template>

<script>
import {ref} from 'vue'
import  Demo  from './components/Demo'
export default ({
    name: 'App',
    // 注册自定义的组件
    components:{ Demo },
    setup(){
        let idShowDemo = ref(true)
        return { idShowDemo }
    }
})
</script>
