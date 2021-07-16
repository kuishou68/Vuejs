<template>
  <h1>{{ sum }}</h1>
  <button @click="sum++">点我+1</button>
  <h2>当前的信息为：{{msg}}</h2>
  <hr>
  <h1>当前信息为{{msg}}</h1>
  <button @click="msg+='!'">修改信息</button>
  <hr>
  <h2>姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <h2>薪资：{{person.job.j1.salary}}K</h2>
  <button @click="person.name+='~'">修改姓名</button>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, watch, watchEffect, reactive } from 'vue'
export default {
    name: 'Demo',
    setup(){
        // 数据
        let sum = ref(0)
        let msg = ref('Hello kuishou')
        let person = reactive({
            name:'张三',
            age:18,
            job:{
                j1:{
                    salary:20
                }
            }
        })
        // watch 和 watchEffect 的区别：
        // watch ：即要指明监视的属性，也要指明监视的回调。
        // watchEffect ： 不用指明监视那个属性，监视的回调用到那个属性，就监视那个属性
        // watchEffect 和 computed
            // computed 更注重计算出来的值（回调函数的返回值）
            // watchEffect 更注重的是过程（回调函数的函数体）
        watchEffect(()=>{
            const x1 = sum.value
            const x2 = person.job.j1.salary
            console.log('watchEffect')
        })

        // 返回一个对象（常用）
        return{
            sum,
            msg,
            person
        }
    }
}
</script>

