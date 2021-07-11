<template>
  <h2>reactive和ref的细节问题</h2>
  <h3>m1:{{ m1 }}</h3>
  <h3>m2:{{ m2 }}</h3>
  <h3>m3:{{ m3 }}</h3>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default {
    name: 'App',
    setup() {
        const m1 = ref('abc')
        const m2 = reactive({})
        const m3 = ref({

        })
        return {

        }
    }
}
</script>

<style>

</style>