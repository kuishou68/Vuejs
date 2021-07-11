<template>
  <!-- 商品列表项 -->
  <!-- 1-1 点击路由跳转带 id ：@click="itemClick(product.id)" -->
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="product.cover_url" alt="">-->
    <img v-lazy="product.cover_url" alt="">
    <div class="goods-info">
      <p>{{ product.title }}</p>
      <span class="price"><small>￥</small>{{ product.price }}</span>
      <span class="collect"><i class="iconfont icon-shoucang1"></i> {{ product.collects_count }}</span>
    </div>
  </div>
</template>
<script>
import {useRouter} from 'vue-router';  // 1-2 引入路由器

export default {
  name: "GoodsLisItem",
  props: { // 接收父组件传值
    product: Object,
    default() {
      return {}
    }
  },
  setup(props) {
    const router = useRouter() // 1-3 声明路由器

    return {
      itemClick: () => {
        router.push({path:'/detail',query:{id:props.product.id}}) // 1-4 本页有 id，在这里传; 页面有缓存
        // console.log(props.product.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 商品列表项
.goods-item {
  width: 46%;
  padding-bottom: 40px;
  position: relative; // 内层，相对外层定位

  img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0; // 左右为 0 内容就会居中
    right: 0; // 左右为 0 内容就会居中
    overflow: hidden; // 超出范围隐藏
    text-align: center;

    p {
      overflow: hidden; // 标题超出范围隐藏
      text-overflow: ellipsis; // 文本超出范围显示 ...
      white-space: nowrap; // 文本不进行换行
      margin-bottom: 3px;
    }

    .price {
      color: red;
      margin-right: 20px;
    }

    .collect {
      position: relative;
    }
  }
}
</style>
