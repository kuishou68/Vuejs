<template>
  <!-- 用户登录 -->
  <div>
    <nav-bar>
      <template v-slot:default>登录</template>
    </nav-bar>

    <div style="margin-top: 50px">
      <div style="text-align: center; padding-top: 50px">
        <van-image
          width="10rem"
          height="5rem"
          fit="contain"
          src="https://www.lmonkey.com/_nuxt/img/logo.ca1ae0c.png"
        />
      </div>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="email"
        name="电子邮箱"
        label="电子邮箱"
        placeholder="请输入正确格式的电子邮箱"
        :rules="[{ required: true, message: '请填写电子邮箱' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <div class="link-login" @click="$router.push({ path: '/register' })">
          没有账号，立即注册
        </div>
        <van-button round block type="info" color="#44b883" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import { ref, reactive, toRefs } from "vue";
import { login } from "@/network/user";
import { Notify, Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex"; // ⚪️ 2-1 引入状态管理

export default {
  name: "Login",
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const store = useStore(); // ⚪️ 2-2 声明状态管理
    //使用reactive加载一个对象
    const userinfo = reactive({
      email: "",
      password: "",
    });
    const onSubmit = () => {
      //把注册信息传给user.js中的data
      login(userinfo).then((res) => {
        // 将token保存到本地 window.loaclStorage setItem(key, value) getTitem(key)
        window.localStorage.setItem("token", res.access_token);
        // 在vuex isLogin里面判断是否登录成功
        store.commit("setIsLogin", true);
        // 在 vuex  isLogin
        Toast.success("登录成功");
        // 清空表单
        userinfo.email = "";
        userinfo.password = "";
        // 登录成功，用定时器跳转一下
        setTimeout(() => {
          router.go(-1); // 从哪来回哪儿去
        }, 500);
      });
    };
    return {
      // 使用toRefs把所有数据一起返回
      ...toRefs(userinfo),
      onSubmit,
    };
  },
};
</script>

<style scoped>
.link_login {
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block; /**行级块 */
  text-align: left;
  float: right;
}
</style>
