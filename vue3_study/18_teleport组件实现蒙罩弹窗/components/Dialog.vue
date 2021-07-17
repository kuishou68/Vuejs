<template>
  <div>
      <button @click="isShow = true">开启弹窗</button>
      <teleport to="body">
        <div class="mask" v-if="isShow">
            <div class="dialog">
                <h3>11111111</h3>
                <h4>22222222</h4>
                <h4>33333333</h4>
                <h4>44444444</h4>
                <button @click="isShow = false">关闭弹窗</button>
            </div>
        </div>
      </teleport>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name:'Dialog',
    setup(){
        let  isShow = ref(false)
        return {isShow}
    }
}
</script>

<style>
    .mask{
        position: absolute;
        top: 0;bottom: 0;left: 0;right: 0;
        background-color: rgb(0,0,0,0.5);
    }
    .dialog{
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        width: 400px;
        height: 400px;
        background-color: #FF3816;
    }
</style>