## 简介
> 最近在写网易云音乐微信小程序，发现项目中少了点什么东西，于是爆肝了几天，参考了很多网上的写法，最终实现了这个简单的登录功能！

## 1.uni-app为什么能够区分不同的小程序，优势在哪里？

uni-app是双渲染引擎,webview和weex可来回切换。又因为使用的是vue语法，借助了Vue中的nextTick机制，更新数据就不需要频繁的调用setData()，比如原生小程序是一条条多次引发逻辑与视图层通讯，uni-app是合并后触发一次通讯。[参考](https://www.cnblogs.com/aimod/p/13830176.html)

uni-app对于支付、分享、第三方登录做了封装，用起来也比较方便，但是在UI这块存在不足，缺少APP的灵活性，动画使用不方便，css动画使用多了会卡顿。

Weex渲染引擎在远行时将原生组件在移动端上渲染，开发阶段，一个weex页面就像开发不同网页一样；在远行时，weex页面又充分利用了各种操作系统的原生组件能力，将其渲染到不同平台（Android或IOS）[参考](https://www.jianshu.com/p/779594934f96)

![](https://upload-images.jianshu.io/upload_images/18489397-c8a248eff54524d5.png?imageMogr2/auto-orient/strip|imageView2/2/w/1043/format/webp)

