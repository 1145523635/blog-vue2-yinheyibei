<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-26 21:26:45
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-26 22:09:03
-->
<template>
  <div class="app-container">
    <div class="container">
      <div>
        <img :src="img404" class="img-404" alt="404" />
        <el-button @click="goHome">返回首页（{{ time }}）</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page404",
  data() {
    return {
      img404: require("@/assets/404/404.png"),

      //自动返回时间
      time: 5,

      //定时器
      timer: null,
    };
  },
  created() {
    this.timer = setInterval(() => {
      if (this.time < 1) {
        this.goHome();
      } else {
        this.time--;
      }
    }, 1000);
  },

  //在页面销毁时 删除定时器
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    //返回首页
    goHome() {
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100vh;
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .img-404 {
      width: 500px;
      display: block;
    }
  }
}
</style>