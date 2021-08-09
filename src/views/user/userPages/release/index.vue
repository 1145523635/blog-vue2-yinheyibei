<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-08-09 23:03:12
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-10 00:05:16
-->
<template>
  <div class="app-container">
    <div class="container">
      <div class="left-link">
        <div
          class="link-item"
          v-for="(item, index) in articleType"
          :key="index"
          @click="changeMenu(item)"
        >
          <p
            :class="{
              'router-link-exact-active': item.id == activeArticleType,
            }"
          >
            <span>{{ item.label }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleTypeList } from "@/api/article/articleList";
export default {
  name: "ReleaseList",
  data() {
    return {
      //文章类型
      articleType: [
        { id: 0, label: "待审核", color: "#f50" },
        { id: 1, label: "审核通过", color: "#2db7f5" },
        { id: 2, label: "审核未通过", color: "#87d068" },
        { id: 3, label: "下架", color: "#87d068" },
        { id: 5, label: "申诉", color: "#108ee9" },
      ],

      //当前文章类型
      activeArticleType: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * 初始化函数
     */
    init() {
      const query = { status: this.activeArticleType };
      getArticleTypeList(query).then((res) => {
        console.log(res);
      });
    },
    /**
     * 改变菜单
     */
    changeMenu({ id }) {
      if (id != this.activeArticleType) {
        this.activeArticleType = id;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
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
        width: 100%;
        // 活动路由样式
        .router-link-exact-active {
          color: #1890ff;
          background: #e6f7ff;
          display: block;
        }
        span {
          padding-right: 20px;
        }
      }
    }
  }
}
</style>