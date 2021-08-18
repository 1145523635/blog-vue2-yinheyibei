<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 22:22:12
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-18 16:54:02
-->
<template>
  <div class="app-container">
    <div class="container">版权银河以北</div>
  </div>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 0;
  .container {
    width: 1380px;
    height: 200px;
    background: #22292d;
    text-align: center;
    color: #ffffff;
    vertical-align: center;
  }
}
</style>