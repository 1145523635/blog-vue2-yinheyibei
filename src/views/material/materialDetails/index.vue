<!--
 * @Descripttion: 资源详情
 * @Author: 银河以北
 * @Date: 2021-10-14 22:26:19
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-14 22:49:31
-->
<template>
  <div class='app-container'>资源详情</div>
</template>

<script>
import { getMaterialDetails } from "@/api/material/materialRecommend";
export default {
  name: "MaterialDetails",
  data() {
    return {
      materialId: 0,
    };
  },
  created() {
    this.materialId = this.$route.query.id;
    this.init();
  },
  methods: {
    init() {
      getMaterialDetails({ id: this.materialId }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
