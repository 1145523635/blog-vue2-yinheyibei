<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 19:37:28
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-15 21:23:54
-->
<template>
  <div class="app-contianer">
    <div class="contianer">
      <!-- 头部 -->
      <div class="contianer-header">
        <div class="header"><Logo></Logo> <Menu></Menu><Login></Login></div>
      </div>

      <!-- 显示内容 -->
      <div class="contianer-main"><Main></Main><UserInfo></UserInfo></div>
      <div class="container-footer"><Footer></Footer></div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import Logo from "./components/logo.vue"; //引入logo
import Menu from "./components/menu.vue"; //引入菜单
import Main from "./components/main.vue"; //引入展示框
import Login from "./components/login.vue"; //引入登录组件
import Footer from "./components/footer.vue"; //引入版权
import UserInfo from "./components/userInfo.vue"; //引入版权
export default {
  name: "Layout",
  components: {
    Logo,
    Menu,
    Main,
    Footer,
    Login,
    UserInfo,
  },
  created() {
    // const a = this.userInfo;
    // console.log(this.$store.getters.hasLogin);
    // if (this.$store.getters.token) {
    //   console.log(this.$store.getters.userInfo.user, "index");
    //   //  this.userInfo = this.$store.state.user.info.user;
    // }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    // ...mapGetters([
    //   "userInfo",
    //   // ...
    // ]),
  },
};
</script>
<style lang="scss" scoped>
.app-contianer {
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgb(245, 246, 247);
  .contianer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .contianer-header {
      padding: 0, 10px, 10px, 10px;
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-around;
      background: #fff;
      margin-bottom: 20px;
      .header {
        min-width: 1380px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .contianer-main {
      width: 1200px;
      min-height: calc(100vh - 60px);
      display: flex;
    }
    .container-footer {
      width: 100%;
      background: #22292d;
    }
  }
}
</style>
