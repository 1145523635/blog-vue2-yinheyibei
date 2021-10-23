<!--
 * @Descripttion: 推荐结果
 * @Author: 银河以北
 * @Date: 2021-10-14 16:08:17
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-23 14:02:18
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
      this.$router.push("/userInfo/material");
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  .container {
    width: 100%;
    .recommend-result {
      width: 100%;
      margin-bottom: 20px;
      text-align: left;
      @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
        .recommend-title {
          background-image: -webkit-linear-gradient(
            left,
            #409eff,
            #ffd90c 25%,
            #409eff 50%,
            #ffd90c 75%,
            #409eff
          );
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-background-size: 200% 100%;
          -webkit-animation: masked-animation 1s infinite linear;
        }
      }

      @-webkit-keyframes masked-animation {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: -100% 0;
        }
      }

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
