<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-21 13:45:36
-->
<template>
  <div class="app-container">
    <div class='container'>
      <div class='banner-container'>
        <Banner :imgs='bannerList' />
      </div>
    </div>
  </div>
</template>

<script>
// 引入插件
import Banner from "@/components/Banner/index.vue";
import { getBannerList } from "@/api/banner/index";
export default {
  name: "Home",
  components: {
    Banner,
  },
  data() {
    return {
      //轮播图图片
      bannerList: [],
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      getBannerList().then((res) => {
        this.bannerList = Object.assign([], res.data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 880px;
  .container {
    width: 100%;
    .banner-container {
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      height: 300px;
    }
  }
}
</style>
