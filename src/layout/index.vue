<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 19:37:28
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-10 22:27:27
-->
<template>
  <div class="app-contianer">
    <div class="contianer">
      <!-- 头部 -->
      <div class="contianer-header"><Logo></Logo> <Menu></Menu></div>

      <!-- 显示内容 -->
      <div class="contianer-main"><Main></Main></div>
      <div class="container-footer"><Footer></Footer></div>
    </div>
  </div>
</template>
<script>
import Logo from "./components/logo.vue"; //引入logo
import Menu from "./components/menu.vue"; //引入菜单
import Main from "./components/main.vue"; //引入展示框
import Footer from "./components/footer.vue"; //引入版权
export default {
  name: "Layout",
  components: {
    Logo,
    Menu,
    Main,
    Footer,
  },
};
</script>
<style lang="scss" scoped>
.app-contianer {
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgb(255, 255, 255);
  .contianer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .contianer-header {
      padding: 0, 10px, 10px, 10px;
      min-width: 1380px;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .contianer-main {
      width: 1200px;
      min-height: calc(100vh - 60px);
    }
    .container-footer {
      width: 100%;
      background: #22292d;
    }
  }
}
</style>
