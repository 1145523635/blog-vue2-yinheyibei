<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 21:26:05
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-03 14:16:18
-->
<template>
  <div class="app-container">
    <transition name="el-zoom-in-center" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: "Main",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
}
</style>