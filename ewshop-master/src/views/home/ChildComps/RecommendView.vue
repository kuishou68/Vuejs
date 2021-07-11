<template>
  <!--  推荐组件 -->
  <div class="recommend">
    <!--  8、遍历获取父组件传过来的值 -->
    <!-- 获取索引 从0开始，取 4个值 recommends.slice(0,4)  -->
    <div class="recommend-item" v-for="item in recommends.slice(0, 4)" :key="item.id">
      <!-- 去除 a 标签默认点击事件，使用自定义的 @click.prevent="goDetail" -->
      <!-- 1-2 跳转到商品说情页面 -->
      <a href="" @click.prevent="goDetail(item.id)">
        <!-- <img :src="item.cover_url"/>--><!--普通加载图片方式-->
        <img v-lazy="item.cover_url" /><!--使用懒加载方式-->
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router"; // 1-1 引入路由器-跳转到商品说情页面

export default {
  name: "RecommendView",
  props: {
    // ⚪️ 7、 接收父组件传过来的数据
    recommends: {
      type: Array,
      defaults() {
        // 给默认值，这样没传数据也可以在页面进行遍历
        return [];
      },
    },
  },
  setup() {
    const router = useRouter(); // 🔴 1-3 跳转到商品说情页面
    const goDetail = (id) => {
      router.push({ path: "/detail", query: { id } }); // 🔴 1-4
    };
    return {
      goDetail, // 🔴 1-5
    };
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  display: flex; // 开启弹性盒模型
  width: 100%;
  text-align: center;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
  font-size: 12px;

  .recommend-item {
    flex: 1; // 每个选项各点一份
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>
