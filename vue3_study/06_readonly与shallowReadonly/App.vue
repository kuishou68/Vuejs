<template>
  <h2>readonly与shallowReadonly</h2>
  <h3>state:{{ state }}</h3>
</template>

<script lang="ts">
import { reactive, ref, shallowReactive, shallowRef, shallowReadonly, readonly } from 'vue'
/**
 * readonly: 深度只读数据
 * 获取一个对象，或 ref 并返回原始代理的只读代理
 * 只读代理是深层的，范文的任何嵌套都是只读的
 * shallowReadonly: 浅只读数据
 * 创建一个代理，使其自身的 property 为只读，但不执行对象的深度只读转换
 */

export default {

  setup () {
      const state = reactive({
          a: 1,
          b: {
              c: 2
          }
      })
      // const rState1 = readonly(state)
      const rState2 = shallowReadonly(state)

      const update = () => {
          // rState1.a++ // error
          // rState1.b.c++ // error

          // rState2.a++ // error
          rState2.b.c++
      }
    return {
        state,
        update
    } 
  }
}
</script>