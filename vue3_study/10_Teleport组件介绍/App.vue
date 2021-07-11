<template>
    <h2>测试</h2>
    <ModalButton />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalButton from './components/ModalButton.vue' // 引入自定义的组件
export default defineComponent({
    name: 'App',
    // 注册自定义的组件
    components: {
        ModalButton
    }
})
</script>
