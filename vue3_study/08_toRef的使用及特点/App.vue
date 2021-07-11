<template>
  <h2>toRef的使用及特点：</h2>
  <h3>state:{{ state }}</h3>
  <h3>age:{{ age }}</h3>
  <h3>money:{{ money }}</h3>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, ref} from 'vue'
// toRaw： 得到 reactive 代理对象的目标数据对象
import Child from './components/Child.vue'
export default {

  setup () {

    const state = reactive({
      foo: 1,
      bar: 2
    })

    const foo = toRef(state, 'foo')
    const foo2 = ref(state.foo)

    const update = () => {
      state.foo++
      // foo.value++
      // foo2.value++  // foo和state中的数据不会更新
    }

    return {
      state,
      foo,
      foo2,
      update,
    }
  },

  components: {
    Child
  }
}
</script>
