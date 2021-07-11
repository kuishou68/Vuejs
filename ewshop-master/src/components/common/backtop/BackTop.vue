<template>
  <div class="backTop" @click="backtop"></div>
</template>

<script>
export default {
  name: "BackTop",
  setup(props, { emit }) {
    // 参数：props 接收属性，emit 上下文里的一个属性
    return {
      //返回父类方法
      backtop: () => {
        emit("bTop"); // 子组件通过 emit 方法调用父组件自定义的事件 bTop ，传索引
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.backTop {
  width: 35px;
  height: 35px;
  position: fixed; /**固定定位 */
  bottom: 70px;
  right: 10px;
  z-index: 20px;
  box-shadow: 3px 3px 3px #888888;
  border-radius: 50%;
  background: #fcfcfc URL("~assets/css/icon/up.png") no-repeat center center; /*不重复，左放中间，上下放中间，背景颜色为fcfcfc的图片 */
}
</style>
