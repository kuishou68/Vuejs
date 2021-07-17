<template>
    <div class="child">
        <h3>Child组件（子）</h3>
        <Son />
    </div>
</template>

<script>
import Son from './Son'
export default ({
    name: 'Child',
    components:{Son},
   
})
</script>

<style>
    .child{
        background-color: rgb(255, 168, 255);
        padding: 10px;
    }
</style>