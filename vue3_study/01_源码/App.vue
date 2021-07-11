<template>
  <!--Vue2中的html模板必须要有一对根标签，Vue3组件的html模板中可以没有根标签-->
  <img alt="Vue logo" src="./assets/logo.png">
  <!--使用这个子级组件-->
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
// 这里可以使用ts的代码
// defineComponent函数， 目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent } from 'vue';
// 引入一个子级组件
import HelloWorld from './components/HelloWorld.vue';
// 暴露出去一个定义好的组件
export default defineComponent({
  // 当前组件的名字是App
  name: 'App',
  // 注册组件
  components: {
    // 注册一个自己组件
    HelloWorld
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
