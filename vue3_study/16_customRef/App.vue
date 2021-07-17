<template>
    <input type="text" v-model="keyWord" />
    <h3>{{keyWord}}</h3>
</template>

<script>
import {ref,customRef} from 'vue'
import  Demo  from './components/Demo'
export default ({
    name: 'App',
    setup(){
        // 使用Vue提供的内置ref
        // let keyWord = ref('hello')

        // 自定义ref
        function myRef(value, delay = 200){
            let timeout // 提前定义时间
            return customRef((track, trigger)=>{
                return {
                    get(){
                        console.log(`读取：${value}`)
                        track() // 4.追踪 value 的改变，一定要写在return之前
                        return value // 3.更新value
                    },
                    set(newValue){
                        console.log(`修改为：${newValue}`)
                        clearTimeout(timeout) // 清除定时器，防抖
                        timeout = setTimeout(()=>{
                            value = newValue // 1.获得修改后的值
                            trigger() // 2.通知Vue去重新解析模板
                        },delay)
                    },
                }
            })
        }
        let keyWord = myRef('hello')

        return { keyWord }
    }
})
</script>
