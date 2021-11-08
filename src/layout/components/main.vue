<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 21:26:05
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-11-08 13:36:51
-->
<template>
  <div class="app-container">
    <div class='mian-container'>
      <transition
        name="slide-fade"
        mode="out-in"
      >
        <keep-alive exclude='MaterialRecommend,MaterialDetails,ReadArticle'>
          <router-view />
        </keep-alive>
      </transition>

      <keep-alive>
        <router-view
          name='userInfo'
          class='userInfo'
        />
      </keep-alive>
    </div>

  </div>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {};
  },
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
  .mian-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .userInfo {
      margin-left: 20px;
    }
  }
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>