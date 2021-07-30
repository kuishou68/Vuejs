<template>
  <!--Vue3绑定动态指令-->
  <div :[attributteName]="d1"></div>
  <button @click="toggleColor">点击切换颜色</button>
</template>

<script>

// 声明式，提前声明好，等数据一来，自动渲染
export default {
  name: 'App',
  data(){
    return {
        attributteName: 'class',
        d1:'d1'
    }
  },
  methods:{
      // 点击之后触发
      toggleColor(){
          this.attributteName = 'id'
      }  
  }
}
</script>

<style>
    #d1{
        width: 100px;
        height: 100px;
        background: red;
    }
    .d1{
        width: 100px;
        height: 100px;
        background: blue;
    }
</style>
 