<!--
 * @Descripttion: 全局登录组件
 * @Author: 银河以北
 * @Date: 2021-06-13 22:07:44
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-13 22:46:12
-->
<template>
  <div class="app-container">全局登录组件</div>
</template>
<script>
export default {
  name: "LoginDialog",
  data() {
    return {
      msg: "全局登录组件",
    };
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  background: red;
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>