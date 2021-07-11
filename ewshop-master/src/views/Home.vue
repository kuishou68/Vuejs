<template>
  <div class="home">

    {{ banner }}
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'; // onMounted 引入此生命周期, ref 添加数据引用对象
import {getHomeAllData} from "@/network/home";

export default {
  name: 'Home',
  setup() {
    const banner = ref([]) // 初始化数据引用对象为空数组

    onMounted(() => {
      // console.log('111111111111')
      getHomeAllData().then(res => {
        // console.log(res)//打印获取到的所有信息
        // console.log(res.data.slides)
        // console.log(res.slides) // 在 request.js 封装了 data 路径后写法
        banner.value = res.slides  // 使用数据引用对象
      }).catch(err => {

      })
    })

    return {
      banner
    }
  }
}
</script>
