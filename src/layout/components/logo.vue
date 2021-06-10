<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 19:58:48
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-10 20:24:16
-->
<template>
  <div class="app-contianer">
    <div class="contianer">
      <div class="logo">
        <img :src="logo" alt="银河以北~logo" class="logo-img" />
      </div>
      <div class="logo-title"><h1>银河以北</h1></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Logo",
  data() {
    return {
      //引入logo图片
      logo: require("@/assets/logo.png"),
    };
  },
};
</script>
<style lang="scss" scoped>
.app-contianer {
  width: 200px;
  height: 100%;
  .contianer {
    width: 200%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    .logo {
      .logo-img {
        width: 50px;
        margin-right: 20px;
      }
    }
    .logo-title {
      background-image: -webkit-linear-gradient(left, #5eaff8, #87c2f8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>