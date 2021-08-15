<!--
 * @Descripttion: 用户信息页
 * @Author: 银河以北
 * @Date: 2021-07-02 21:01:17
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-14 14:23:45
-->
<template>
  <div class="app-container">
    <div class="container">
      <!--左侧导航栏 -->
      <div class="left-link">
        <div class="link-item">
          <router-link tag="div" :to="{ name: 'BaseSetting' }"
            ><span>基本配置</span>
          </router-link>
        </div>
        <div class="link-item">
          <router-link tag="div" :to="{ name: 'SecuritySetting' }"
            ><span>安全配置</span></router-link
          >
        </div>
      </div>
      <!-- 右侧展示信息 -->
      <div class="right-container">
        <transition
          mode="out-in"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <keep-alive>
            <router-view :key="key" />
          </keep-alive>
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
  height: 100%;
  .container {
    height: 100%;
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
        cursor: pointer;
        line-height: 40px;
        text-align: right;
        position: relative;
        // 活动路由样式
        .router-link-exact-active {
          color: #1890ff;
          background: #e6f7ff;
          display: block;
        }
        .router-link-exact-active::after {
          content: " ";
          width: 2px;
          height: 40px;
          background: #409eff;
          position: absolute;
        }
        span {
          padding-right: 20px;
        }
      }
    }
    .right-container {
      width: 100%;
    }
  }
}
</style>