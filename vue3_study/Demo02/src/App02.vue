<template>
  <!--类class-->
  <h1 :class="msg">11111</h1>
  <!--配置对象-->
  <h1 :class="{active:isActive}">22222</h1>
  <button @click="toggleActive">切换active</button>
  <!--配置数组-->
  <h1 :class="arr">33333</h1>
  <!--数组和对象结合-->
  <h1 :class="['abc', {active:true}]">44444</h1>
</template>

<script>

// 声明式，提前声明好，等数据一来，自动渲染
export default {
  name: 'App',
  data(){
    return {
        msg: "Hello kuishou",
        isActive:true,
        arr:['swiper','active']
    }
  },
  methods:{
      // 点击之后触发
      toggleActive(){
          this.isActive = !this.isActive
         
      }  
  }
}
</script>

<style>

</style>
 