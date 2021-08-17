<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-26 21:17:48
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-17 01:10:46
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 头部背景 -->
      <div class="header-container">
        <el-image
          style="width: 100%; height: 100%"
          fit="cover"
          :src="defaultImg"
        >
        </el-image>
      </div>
      <!-- 过滤方法 -->
      <div class="filter-container">
        <!-- 文章分类过滤 -->
        <div class="filter-classification">
          <div class="filter-header">
            <i class="el-icon-folder-opened"></i> 分类
            <span class="division">|</span>
          </div>
          <div class="filter-item">
            <span
              v-for="(item, index) in optionsData.classification"
              :key="index"
              >{{ item.classification_name }}</span
            >
          </div>
        </div>
        <!-- 文章专题过滤 -->
        <div class="filter-classification">
          <div class="filter-header">
            <i class="el-icon-collection-tag"></i> 专题
            <span class="division">|</span>
          </div>
          <div class="filter-item">
            <span v-for="(item, index) in optionsData.special" :key="index">{{
              item.special_name
            }}</span>
          </div>
        </div>
        <!-- 文章标签 -->
        <div class="filter-classification">
          <div class="filter-header">
            <i class="el-icon-s-flag"></i> 标签 <span class="division">|</span>
          </div>
          <div class="filter-item">
            <span v-for="(item, index) in optionsData.label" :key="index">{{
              item.label_name
            }}</span>
          </div>
        </div>
      </div>
      <!-- 内容展示 -->
      <div class="article-container">
        <div class="no-data" v-if="articleList.length == 0">
          <div><span>找不到文章咯！</span></div>
        </div>
        <div class="article-data" v-else>
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
                <div class="avatar" style="margin-right: 5px">
                  <img
                    width="100%"
                    height="100%"
                    :src="$utils.imgUrl(item.getUserInfo.avatar_url)"
                    alt=""
                  />
                </div>
                <div style="margin-right: 5px">
                  <span>{{ item.getUserInfo.nickname }}</span>
                </div>
                <div>
                  <span>{{ $utils.getPastTimes(item.create_time) }}</span>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleReleaseOption } from "@/api/article/releaseArticle";
import { getRecommendArticle } from "@/api/article/recommendArticle";
export default {
  name: "Resources",

  data() {
    return {
      //默认图片
      defaultImg: require("@/assets/defaultData/background/background.png"),

      //过滤数据
      optionsData: {
        classification: [], //文章分类
        special: [], //文章专题
        label: [], //文章标签
      },

      //文章数据
      articleList: [],
    };
  },
  created() {
    this.configData();
    this.init();
  },
  methods: {
    //初始化函数
    init() {
      //文章数据
      getRecommendArticle().then((res) => {
        this.articleList = Object.assign({}, res.data);
      });
    },

    //查看详细文章
    toReadArticle({ id }) {
      this.$router.push({ name: "ReadArticle", query: { id } });
    },

    //配置数据函数
    configData() {
      //获取过滤数据
      getArticleReleaseOption().then((res) => {
        this.optionsData = Object.assign({}, res.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  .container {
    width: 100%;
    .header-container {
      width: 100%;
      height: 300px;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .filter-container {
      width: 100%;
      margin-bottom: 20px;
      .filter-classification {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin-top: 10px;
        .filter-header {
          color: #777;
          font-size: 14px;
          cursor: pointer;
          .division {
            margin-left: 3px;
            margin-right: 3px;
          }
        }
        .filter-item {
          color: #999;
          font-size: 14px;
          span {
            margin-left: 5px;
            margin-right: 5px;
            cursor: pointer;
          }
          span:hover {
            color: #409eff;
          }
        }
      }
    }
    .article-container {
      width: 100%;
      margin-bottom: 20px;
      .article-data {
        width: 100%;
        display: flex;
        justify-content: flex-start;
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
            .time {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .avatar {
                width: 15px;
                height: 15px;
                overflow: hidden;
                border-radius: 50%;
              }
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
      .no-data {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #777;
        span:before,
        span:after {
          content: "";
          width: 200px;
          height: 1px;
          background: #777;
          display: block; /*1.首先使伪类显示方式为块级元素*/
          position: relative; /*2.通过相对定位的方式控制两侧内容的位置*/
        }
        span:before {
          /*3.控制左侧横线的位置*/
          top: 11px;
          left: 180px;
        }
        span:after                  /*4.控制右侧横线的位置*/ {
          top: -10px;
          right: 180px;
        }
      }
    }
  }
}
</style>