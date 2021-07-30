<template>
  <!--Vue3中这里可以放置好几个不同的组件-->
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  
  <!--v-once指令，使得内容只渲染一次-->
  <h1 @click="change" v-once >{{ msg }}</h1>
  <input type="text" v-model="msg"/> 

  <!--html指令，使得内容插入html的代码-->
  <div v-html="content"></div>

  <!---->

</template>

<script>
// 命令式，一个个指令的渲染某个节点
// document.querySelector("h1").innerHTML = "hello kuishou!"
// 声明式，提前声明好，等数据一来，自动渲染
export default {
  name: 'App',
  data(){
    return {
        msg: "hello kuishou!",
        content: "<h1>标题1</h1>"
    }
  },
  methods:{
      // 点击之后触发
      change(){
          this.msg = "kuishou Hello! "
      }
  }
}
</script>
