<template>
  <!-- 商品详情页面 -->
  <div>
    <!-- 顶部 -->
    <nav-bar>
      <template v-slot:default>商品详情:{{ id }}</template>
    </nav-bar>

    <!-- 图片区域 laxd-load懒加载图片-->
    <van-image style="margin-top: 50px" width="100%" lazy-load :src="detail.cover_url" />
    <!-- 商品详情 -->
    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price + '.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">{{
          (detail.is_recommend = 1 ? "推荐" : "")
        }}</van-tag>
      </template>

      <template #footer>
        <!--  3-1 @click="handleAddCart"  @click="goToCart" -->
        <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
        <van-button type="danger" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>

    <!-- 标签页 -->
    <van-tabs v-model="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div v-for="item in detail.comments">
          <div>{{ item.reply }}</div>
          <div>{{ item.content }}</div>
          <div>{{ item.pics_url }}</div>
          <div>{{ item.created_at }}</div>
        </div>
      </van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import { useRoute, useRouter } from "vue-router"; // 注意：这里导入路由，不是路由器
import { useStore } from "vuex"; // ⚪️ 1 引入状态管理
import { ref, onMounted, reactive, toRefs } from "vue"; //  2-1 onMounted , reactive,toRefs
import { getDetail } from "@/network/detail"; //  2-2
import GoodsList from "@/components/content/goods/GoodsList";
import { addCart } from "@/network/cart";
import { Toast } from "vant";

export default {
  name: "Detail",
  components: {
    NavBar, // 1-2 注册组件
    GoodsList,
  },
  setup() {
    let active = ref(1); // 标签页 默认激活第 1个
    const route = useRoute(); //通过路由
    const router = useRouter(); // 路由器
    const store = useStore(); // ⚪️ 2

    let id = ref(0);
    let book = reactive({
      //️ 2-3 定义空对象封装数据
      detail: {}, //当前商品
      like_goods: [], // 类似商品
    });

    onMounted(() => {
      //  2-4  获取参数id
      id.value = route.query.id;
      // 数据初始化
      getDetail(id.value).then((res) => {
        console.log(res);
        book.detail = res.goods;
        book.like_goods = res.like_goods;
      });
    });

    //  3-2 添加购物车
    const handleAddCart = () => {
      // console.log('加入购物车')
      // 商品id book下面的详情
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        // console.log(res.status) // 添加 1次，状态码 201 ； 添加第 2 次，状态码 204
        if (res.status === 201 || res.status === 204) {
          Toast.success("添加成功！"); //  使用轻提示
          store.dispatch("updateCart"); // ⚪️ 3 分发，状态管理，设置购物车数量 cartCount
        }
        // console.log(res.status)
      });
    };

    //  3-3 立即购买
    const goToCart = () => {
      // console.log('立即购买')
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        if (res.status === 201 || res.status === 204) {
          Toast.success("添加成功,显示购物车");
          store.dispatch("updateCart"); // ⚪️ 3 分发，状态管理，设置购物车数量 cartCount
          router.push({ path: "/shopcart" }); // 跳转到购物车
        }
      });
    };

    return {
      id,
      ...toRefs(book), //  2-5 解构每一个对象
      active,
      handleAddCart, //  3-4
      goToCart, //  3-4
    };
  },
};
</script>

<style scoped></style>
