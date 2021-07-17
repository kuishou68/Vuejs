<template>
    <div class="app">
        <h3>APP组件（祖）</h3>
        <Child />
    </div>
</template>

<script>
import Child from './components/Child'
export default ({
    name: 'App',
    components:{Child},
    
})
</script>

<style>
    .app{
        background-color: aqua;
        padding: 10px;
    }
</style>