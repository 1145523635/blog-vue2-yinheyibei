<!--
 * @Descripttion: 推荐结果
 * @Author: 银河以北
 * @Date: 2021-10-14 16:08:17
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-11-07 20:39:07
-->
<template>
  <div class='app-container'>
    <div class='container'>
      <div class='recommend-result'>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span class='recommend-title'>推荐结果</span>
          </div>
          <el-result
            icon="success"
            title="提交成功"
            subTitle="感谢您的推荐，我们将尽快审核！"
          >
            <template slot="extra">
              <el-button
                type="primary"
                size="small"
                @click="continueRecommend"
              >继续推荐</el-button>
              <el-button
                size="small"
                @click="toUserInfo"
              >返回个人中心</el-button>
            </template>
          </el-result>
        </el-card>
      </div>
      <div class='recommend-item'>
        <el-card
          class="box-card"
          shadow="hover"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>推荐资源</span>
          </div>
          <MaertrialItem :materialData='materialData' />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import MaertrialItem from "@/components/materialItem/index.vue";
import { getMaterialById } from "@/api/material/materialRecommend";
export default {
  name: "MaterialResult",
  components: {
    MaertrialItem,
  },
  data() {
    return {
      //资源数据
      materialData: {},

      //资源ID
      materialId: 0,
    };
  },
  created() {
    this.materialId = this.$route.query.id;
    this.init();
  },
  methods: {
    //数据初始化
    init() {
      getMaterialById({ id: this.materialId }).then((res) => {
        this.materialData = res.data;
      });
    },

    //继续推荐
    continueRecommend() {
      this.$router.push({
        path: "/materialRecommend",
      });
    },

    //返回个人中心
    toUserInfo() {
      const USERID = this.$store.getters.userId;
      this.$store.commit("SET_VISITOR_ID", USERID);
      const VISITORID = this.$store.getters.visitorId;
      this.$router.push({
        path: `/userInfo/${VISITORID}/material`,
        query: {
          activeArticleType: 1,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/style/commonStyle.less";
.app-container {
  width: 100%;
  .container {
    width: 100%;
    .recommend-result {
      width: 100%;
      margin-bottom: 20px;
      text-align: left;
      .title-color-scroll-style();
      .recommend-title {
        font-weight: 800;
      }
    }
    .recommend-item {
      width: 100%;
      display: flex;
      justify-content: center;
      .box-card {
        width: 400px;
        .clearfix {
          text-align: left;
        }
      }
    }
  }
}
</style>
