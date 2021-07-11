<template>
  <div>
    <nav-bar>
      <template v-slot:default>新用户注册</template>
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
        v-model="name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password_confirmation"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="密码"
        :rules="[{ required: true, message: '两次密码不相同，请重新输入' }]"
      />
      <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <div style="margin: 16px">
        <!-- // ⚪️ 1-3 路由直接跳转  @click="$router.push({path:'/login'})" -->
        <div class="link-login" @click="$router.push({ path: '/login' })">
          已有账号，立即登录
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
import { register } from "@/network/user";
import { Notify, Toast } from "vant";
import { useRouter } from "vue-router"; // ⚪️ 1-1 路由直接跳转

export default {
  name: "Reister",
  components: {
    NavBar,
  },
  setup(props) {
    const router = useRouter(); // ⚪️ 1-2 路由直接跳转
    //使用reactive加载一个对象
    const userinfo = reactive({
      name: "",
      password: "",
      password_confirmation: "",
      email: "",
    });
    const onSubmit = () => {
      // 先验证
      if (userinfo.password !== userinfo.password_confirmation) {
        Notify("两次密码不一致，请重新输入!");
      } else {
        // 再提交,把所有提交的数据返回，并
        register(userinfo).then((res) => {
          if (res.status === 201) {
            Toast.success("注册成功");
            setTimeout(() => {
              // 注册成功之后 1秒钟 跳转到登录页面
              router.push({ path: "/login" });
            }, 1000);
          }
          // 清空密码表单
          userinfo.password = "";
          userinfo.password_confirmation = "";
        });
      }
    };
    return {
      // 使用toRefs把所有数据一起返回
      ...toRefs(userinfo),
      onSubmit,
    };
  },
};
</script>

<style>
.link_login {
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block; /**行级块 */
  text-align: left;
  float: right;
}
</style>
