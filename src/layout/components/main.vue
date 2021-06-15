<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 21:26:05
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-15 22:03:53
-->
<template>
  <div class="app-container">
    <transition name="el-zoom-in-center" mode="out-in">
      <router-view :key="key" />
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
  width: calc(100% - 300px);
}
</style>