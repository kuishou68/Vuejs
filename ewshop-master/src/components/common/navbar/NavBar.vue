<template>
  <div class="nav-bar">
    <!-- 1-1 给 < 图标添加点击事件 -->
    <div class="left" @click="goback">
      <slot name="left"><i class="iconfont icon-lift"></i></slot>
    </div>
    <div class="center">
      <!-- src/views/home/Home.vue 页面引用此组件，这里的 EWShop 显示无效-->
      <slot>EWShop</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
import {useRouter} from 'vue-router'; // 1-2 获取路由方法
export default {
  name: "NavBar",
  setup() {
    const router = useRouter() // 1-3 声明路由器

    // 返回
    const goback = () => {
      router.go(-1); // 加到上一个页面
    }

    return {
      goback
    }
  }
}
</script>

<style lang="scss" scoped>
// 顶部导航
.nav-bar {
  display: flex;
  background-color: var(--color-tint);
  color: #FFFFFF;
  position: fixed; // 固定定位 顶部
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; // 在最上层
  height: 45px;
  line-height: 45px; // 行高与高度一样可让文字垂直居中
  text-align: center;
  box-shadow: 0 2px 0 rgba(100, 100, 100, 0.1);

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1; // 除掉左右，占全部
  }
}
</style>
