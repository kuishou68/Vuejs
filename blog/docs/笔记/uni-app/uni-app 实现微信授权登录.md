> 最近在写网易云音乐微信小程序，发现项目中少了点什么东西，于是爆肝了几天，参考了很多网上的写法，最终实现了这个简单的登录功能！

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06e56346a6314b6abb7a8fce7b5e4596~tplv-k3u1fbpfcp-zoom-1.image)



> 注意，微信小程序是没有登出功能的，害的我找了半天的api，在平时的是使用中，退出小程序直接点右上角的小圆点，只要你第一次授权登录了，下次登录基本会记住你的头像信息，当然也不排除一些很蛋疼的小程序，每次都要重复授权！！

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ac8e3ed7ebd47e49728aaf2a7f2b1ef~tplv-k3u1fbpfcp-zoom-1.image)



> 话不多说，请看代码

index.vue

```
<template>
 <view class="index">
  <musichead title="网易云音乐" :icon="false"></musichead>
  <view class="container">
   <scroll-view scroll-y="true">
    <!--登录-->
    <view class="index-login">
     <view class="index-login-left">
      <image class="index-login-left-img" :src="userInfo.avatarUrl"></image>
     </view>
     <text class="idnex-login-text">{{ userInfo.nickName ||  '未登录' }}</text>
     <!--#ifdef MP-WEIXIN--> 
      <button type="sumbit" plain="true" size="mini" open-type="getUserInfo" @tap="login" @click="change" >{{ logState }}</button>
     <!--#endif-->
    </view>
   </scroll-view>
  </view>
 </view>
</template>
<script>
 // 引入css
 import '../../common/iconfont.css'
 // 引入接口
 import { topList } from '../../common/api.js'
 export default {
  data() {
   return {
    topList : [],
    userInfo : {},
    logState : '立即登录',
   };
  },
  onLoad(){ }，
  methods: {
   // 登录部分
   login(){
    // 获取code 小程序专有，用户登录凭证。
    uni.getUserProfile({
     desc: "获取用户基本资料",
     success : (res)=>{
      this.userInfo = res.userInfo;
     },
     // 用户取消登录后的提示
     fail: (res)=>{
      uni.showModal({
       title:"授权用户信息失败！",
       // 是否显示取消按钮，默认为 true
       showCancel:false
      })
     }
    })
    //获取成功基本资料后开启登录，基本资料首先要授权
    uni.login({
     provider : 'weixin',
     success : (res)=>{
      console.log(res);
      if(res.errMsg == "login:ok"){
       let code =res.code;
      }
     }
    })
   },
   // 退出登录
   change(){
    // 这里只是改变了按钮文字内容，真正退出需要清除token，回到首页,还没找到头绪怎么做
    this.logState = '已登录';
   }
  }
</script>
<style>
 /*登录*/
 .index-login{ margin: auto; width:379px; }
 .index-login-left{ width:35px; height:35px;  position: absolute; overflow: hidden; background: url(../../static/user.png); }
 .index-login-left-img{ width:35px; height:35px;  border-radius: 50%; }
 .index-login-img-text{ font-size:34px; color:#dddddd; }
 .idnex-login-text{ font-size:14px; vertical-align: sub; margin-left: 45px; color:#888; }
 .index-login button{ float:right; border:1px #dddddd solid; border-radius: 30px; }
</style>

```