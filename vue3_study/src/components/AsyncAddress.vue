<template>
    <h2>AsyncAddress组件</h2>
    <h3>{{ data }}</h3>
</template>

<script>
import { defineComponent } from 'vue'
// 引入axios
import axios from 'axios'
export default {
    name: 'AsyncAddress',
    setup() {
        return axios.get('/data/address.json').then(response => {
            return {
                data: response.data
            }
        })
    }
}
</script>