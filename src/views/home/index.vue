<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-26 23:06:30
-->
<template>
  <div class="home">
    <button @click="to404">跳404</button>
    <transition>
      <div class="show animated fadeIn" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    to404() {
      this.isShow = !this.isShow;
    },
  },
};
</script>
<style lang="less" scoped>
.show {
  width: 500px;
  height: 500px;
  background: red;
}
</style>
