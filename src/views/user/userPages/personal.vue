<!--
 * @Descripttion: 用户信息页
 * @Author: 银河以北
 * @Date: 2021-07-02 21:01:17
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-13 15:55:05
-->
<template>
  <div class="app-container">
    <div class="container">
      <!--左侧导航栏 -->
      <div class="left-link">
        <div class="link-item">
          <p>
            <router-link tag="span" :to="{ name: 'BaseSetting' }"
              >基本配置</router-link
            >
          </p>
        </div>
        <div class="link-item">
          <p>
            <router-link tag="span" :to="{ name: 'SecuritySetting' }"
              >安全配置</router-link
            >
          </p>
        </div>
      </div>
      <!-- 右侧展示信息 -->
      <div class="right-container">
        <transition name="el-zoom-in-center" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Persoal",
  data() {
    return {};
  },
  created() {},
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
  .container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .left-link {
      width: 200px;
      min-height: 200px;
      border-right: 1px solid #e8e8e8;
      .link-item {
        width: 100%;
        height: 40px;
        background: #e6f7ff;
        cursor: pointer;

        p {
          line-height: 40px;
          text-align: right;
          padding-right: 20px;
          color: #1890ff;
        }
      }
    }
    .right-container {
      width: 100%;
    }
  }
}
</style>