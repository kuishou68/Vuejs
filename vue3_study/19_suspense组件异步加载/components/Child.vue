<template>
    <div class="child">
        <h3>Child组件（子）</h3>
        {{sum}}
    </div>
</template>

<script>
import {ref} from 'vue'
export default ({
    name: 'Child',
    async setup(){
        let sum = ref(0)
        let p = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve({sum})
            },3000)
        })
        return await p
    }
})
</script>

<style>
    .child{
        background-color: rgb(255, 168, 255);
        padding: 10px;
    }
</style>