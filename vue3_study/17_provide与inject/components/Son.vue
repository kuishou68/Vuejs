<template>
    <div class="app">
        <h3>Son组件（孙）,{{car.name}}---{{car.price}}</h3>
        
    </div>
</template>

<script>
    import {inject} from 'vue'
    export default ({
        name: 'Son',
        setup(){
            /**
             * provide 与 inject 
             * provide 提供  
             * inject 注入
             */
        let car = inject('car')
        console.log(car,'-------------')
        return {car}
        }
    })
</script>

<style>
    .app{
        background-color: royalblue;
    }
</style>