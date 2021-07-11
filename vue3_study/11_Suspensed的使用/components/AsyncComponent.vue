<template>
    <h3>AsyncComponent子级组件</h3>
    <h3>{{ msg }}</h3>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name: 'AsyncComponent',
    setup() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    msg: '11111111111111111',
                })
            },2000)
        })
    }
})
</script>
