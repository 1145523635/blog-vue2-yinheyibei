<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-08-09 23:03:12
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-16 00:54:50
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
      <div class="right-container">
        <div class="not-data" v-if="articleList.length == 0">
          <div class="img-container">
            <img width="100%" :src="notDataImg" :alt="notDataImg" />
          </div>
        </div>
        <div class="article-container" v-else>
          <div
            class="article-item"
            v-for="(item, index) in articleList"
            :key="index"
          >
            <div class="article-img" @click="toReadArticle(item)">
              <img
                width="100%"
                height="100%"
                :src="$utils.imgUrl(item.cover_img_url)"
                alt=""
              />
            </div>
            <div class="article-title" @click="toReadArticle(item)">
              <h4>{{ item.article_title }}</h4>
            </div>
            <div class="article-tage">
              <el-tag size="mini" effect="dark" class="item-tag"
                ><i class="el-icon-folder-opened"></i>
                {{ item.getArticleClassification.classification_name }}</el-tag
              >
              <el-tag
                size="mini"
                type="success"
                effect="dark"
                class="item-tag"
                v-for="(value, key) in item.special"
                ><i class="el-icon-collection-tag"></i>
                {{ value.special_name }}</el-tag
              >
              <el-tag
                size="mini"
                type="info"
                class="item-tag"
                v-for="(value, key) in item.label"
                ><i class="el-icon-s-flag"></i>{{ value.label_name }}</el-tag
              >
            </div>
            <div class="article-time">
              <div class="time">
                <span>{{ $utils.getPastTimes(item.create_time) }}</span>
              </div>
              <div class="other">
                <span class="other-item"
                  ><i class="el-icon-chat-dot-square"></i> 0</span
                >
                <span class="other-item"
                  ><i class="el-icon-view"></i> {{ item.browse_num }}</span
                >
                <span class="other-item"
                  ><i class="el-icon-star-off"></i> {{ item.thumbs_num }}</span
                >
                <el-dropdown
                  v-show="activeArticleType == 2 || activeArticleType == 3"
                  style="margin-left: 20px"
                  size="mini"
                >
                  <span class="el-dropdown-link">
                    <i class="el-icon-setting"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="articleAppeal(item)">
                      申诉</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 申诉弹出框 -->
    <el-dialog
      :visible.sync="appealShow"
      width="30%"
      :before-close="handleClose"
    >
      <template slot="title">
        <div class="appeal-title">
          关于对文章的<span>{{ appealArticleTitle }}</span
          >申诉内容
        </div>
      </template>
      <div class="appeal-container">
        <p>请输入申诉内容：</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 10 }"
          placeholder="请输入内容"
          v-model="appealForm.appealContainer"
          maxlength="450"
          show-word-limit
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button
          type="primary"
          @click="saveData()"
          size="mini"
          :loading="btnLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleReleaseOption } from "@/api/article/releaseArticle";
import { getArticleTypeList, appealArticle } from "@/api/article/articleList";

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

      //文章数据
      articleList: [],

      //页面选项配置参数
      configData: {
        //文章分类
        classification: [],

        //文章专题
        special: [],

        //文章标签
        label: [],
      },
      //没有数据图片
      notDataImg: require("@/assets/notData/notData.png"),

      //弹出框控制变量
      appealShow: false,

      //申诉文章标题
      appealArticleTitle: "",

      //申诉内容
      appealForm: {
        id: "",
        appealContainer: "",
      },

      //按钮加载状态
      btnLoading: false,
    };
  },
  created() {
    this.init();
    // this.getConfigData();
  },
  methods: {
    /**
     * 初始化函数
     */
    init() {
      const query = { status: this.activeArticleType };
      getArticleTypeList(query).then((res) => {
        this.articleList = res.data;
      });
    },

    /**
     * 提交申诉内容
     */
    saveData() {
      this.btnLoading = true;
      if (this.appealForm.appealContainer == "") {
        this.$message.error("请输入申诉内容！");
        this.btnLoading = false;
        return;
      }
      const data = {
        article_id: this.appealForm.id,
        reason: this.appealForm.appealContainer,
      };
      appealArticle(data).then((res) => {
        this.btnLoading = false;
        if (res.code == 200) {
          this.$notify({
            title: "成功",
            message: "你的申诉已提交至后台管理员审核，请耐心等待1到3个工作日！",
            type: "success",
          });
        }
        this.handleClose();
      });
    },

    /**
     * 点击下拉菜单(申诉)
     */
    articleAppeal(item) {
      this.appealForm.id = item.id;
      this.appealArticleTitle = item.article_title;
      this.appealShow = true;
    },

    /**
     * 页面配置参数
     */
    getConfigData() {
      getArticleReleaseOption().then((res) => {
        this.configData = Object.assign({}, res.data);
      });
    },

    /**
     * 去阅读文章
     */
    toReadArticle({ id }) {
      this.$router.push({ name: "ReadArticle", query: { id } });
    },

    /**
     * 改变菜单
     */
    changeMenu({ id }) {
      if (id != this.activeArticleType) {
        this.activeArticleType = id;
      }
    },

    /**
     * 弹出框关闭回调
     */
    handleClose() {
      this.appealContainer = "";
      this.appealShow = false;
    },
  },
  watch: {
    activeArticleType() {
      this.init();
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
      width: calc(100% - 200px);
      background-color: #f5f6f7;
      .article-container {
        width: 100%;
        margin: 10px;
        margin-top: 0;
        display: flex;
        justify-content: flex-start;
        align-items: top;
        flex-wrap: wrap;
        .article-item {
          padding: 10px;
          width: 250px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background: #fff;
          border-radius: 5px;
          overflow: hidden;
          transition: 0.5s;
          margin-right: 10px;
          .article-img {
            width: 100%;
            height: 150px;
            border-radius: 5px;
            overflow: hidden;
          }
          .article-title {
            width: 100%;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-align: left;
            height: 60px;
            h4 {
              margin-top: 10px;
            }
          }
          .article-title:hover {
            color: #3390ff;
          }
          .article-tage {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            overflow-x: auto;
            &::-webkit-scrollbar {
              height: 4px;
            }
            &::-webkit-scrollbar-thumb {
              background-color: rgba(144, 147, 153, 0.3);
              border-radius: 2px;
            }
            &::-webkit-scrollbar-track {
              background-color: #f0f2f5;
            }
            &::-webkit-scrollbar-thumb:hover {
              background-color: rgba(144, 147, 153, 0.6);
            }
            &::-webkit-scrollbar-thumb:active {
              background-color: rgba(144, 147, 153, 0.9);
            }
            .item-tag {
              margin-right: 3px;
            }
          }
          .article-time {
            margin-top: 10px;
            font-size: 12px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .time::before {
              position: relative;
              content: " ";
              display: inline-block;
              width: 5px;
              height: 5px;
              background-color: #409eff;
              border-radius: 50%;
              margin-right: 5px;
              top: -1px;
            }
            .other-item {
              margin-right: 5px;
            }
          }
        }
        .article-item:hover {
          box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.22),
            0 0 6px rgba(0, 0, 0, 0.14);
        }
      }
      .not-data {
        width: 100%;
        height: 100%;
        display: flex;
        background-color: #fff;
        justify-content: center;
        align-content: center;
        .img-container {
          width: 400px;
        }
      }
    }
  }
  .appeal-title {
    width: 100%;
    text-align: left;
    font-size: 16px;
    span {
      color: #409eff;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .appeal-container {
    width: 100%;
    text-align: left;
    p {
      margin-bottom: 5px;
    }
  }
}
</style>