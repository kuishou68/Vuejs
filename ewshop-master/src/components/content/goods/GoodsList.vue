<template>
  <!-- 商品列表 -->
  <div class="goods">
    <!--  ⚪️ 2 输出子组件内容 -->
    <!-- ⚪️ 3 再使用属性传值给 子组件 :product="item" GoodsLisItem -->
    <goods-lis-item v-for="item in goods" :product="item" :key="item.id"/>

  </div>
</template>
<script>
import GoodsLisItem from "@/components/content/goods/GoodsLisItem"; // ⚪️ 1 引入组件

export default {
  name: "GoodsList",
  props: {  // ⚪️ 1 接收父组件传值
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsLisItem  //  2 注册组件
  }
}

</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  flex-wrap: wrap; // 自动换行
  justify-content: space-around; // 环绕
  padding: 5px;
}
</style>
