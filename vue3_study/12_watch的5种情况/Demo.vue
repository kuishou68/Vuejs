<template>
  <h1>{{ sum }}</h1>
  <button @click="sum++">点我+1</button>
  <h2>当前的信息为：{{msg}}</h2>
  <hr>
  <h1>当前信息为{{msg}}</h1>
  <button @click="msg+='!'">修改信息</button>
  <hr>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <h2>薪资：{{person.job.j1.salary}}K</h2>
  <button @click="person.name+='~'">修改姓名</button>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, watch, reactive } from 'vue'
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
        // 监视
        // vue3 的写法
        // 情况一：监听ref定义的响应式数据
        // watch(sum,(newValue,oldValue)=>{
        //     console.log('sum值变化了',newValue, oldValue)
        // })
        // 情况二：监听ref所定义的多个响应式数据
        // watch([sum,msg],(newValue,oldValue)=>{
        //     console.log('sum或msg变了',newValue,oldValue)
        // })
        /*
         情况三：监听reactive 所定义的一个响应式数据，
            1.注意：此处无法正确的获取oldValue
            2.注意：强制开启了深度监视（deep无效)
        */
        // watch(person, (newValue, oldValue)=>{
        //     console.log('person变化了',newValue,oldValue)
        // })
        // 情况四：监视reactive所定义的一个响应式数据中的 某个属性
        watch(person.age, (newValue,oldValue)=>{
            console.log('persong的name变化了',newValue,oldValue)
        })
        // 情况五：监视reactive所定义的一个响应式数据中的 某些属性
        watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
            console.log('person的name或age变化了',newValue,oldValue)
        })
        // 特殊情况:此处由于监视的是reactive定义的对象中的某个属性，所以deep配置有效
        watch(()=>person.name,(newValue,oldValue)=>{
            console.log('person的job变化了',newValue,oldValue)
        },{deep:true})
        // 返回一个对象（常用）
        return{
            sum,
            msg,
            person
        }
    }
}
</script>

