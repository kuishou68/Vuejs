<template>
    <div class="son">
        <h3>Son组件（孙）</h3>
        <Dialog />
    </div>
</template>

<script>
    import Dialog from './Dialog.vue'
    export default ({
        name: 'Son',
        components:{Dialog}
    })
</script>

<style>
    .son{
        background-color: royalblue;
        padding: 10px;
    }
</style>