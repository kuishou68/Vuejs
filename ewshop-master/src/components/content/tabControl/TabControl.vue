<template>
  <!-- 首页选项卡内容 -->
  <div class="tab-control">
    <!-- 5、遍历取出父组件传来的值 -->
    <!-- 1-4 绑定单击事件 @click="itemClick(index)"  -->
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index"
         @click="itemClick(index)">
      <!-- 1-7 样式赋值给当前索引 :class="{active:index === currentIndex}"  -->
      <span :class="{active:index === currentIndex}">{{ item }}</span>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'; // 1-1 选项激活状态

export default {
  name: "TabControl",
  props: { // 4、props 接收属性；接收父组件传递过来的 titles 数组值
    titles: {
      Array,
      default() {
        return []
      }
    }
  },
  setup(props,{emit}) { // ⚪️ 1 props 接收属性，emit 上下文里的一个属性
    let currentIndex = ref(0) // 1-2 当前索引 选项激活状态
    const itemClick = (index) => {
      currentIndex.value = index  // 1-5 点中哪个就获取那个索引
      emit('tabClick',index) // ⚪️ 2 子组件通过 emit 方法调用父组件自定义的事件,传索引
    }
    return {
      currentIndex, // 1-3 返回当前索引
      itemClick  // 1-6 返回
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  background-color: #FFFFFF;
  width: 100%;
  z-index: 10; // 层级

  position: sticky;  // 1 固定定位
  top: 44px;         // 2 固定定位

  .tab-control-item {
    flex: 1; // 平均占1份
    span {
      padding: 6px;
    }
  }

  .active {
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
}
</style>
