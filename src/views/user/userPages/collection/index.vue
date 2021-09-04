<!--
 * @Descripttion: 收藏
 * @Author: 银河以北
 * @Date: 2021-08-28 22:24:23
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-09-01 20:39:06
-->
<template>
  <div class="app-container">
    <div class="container">
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
              :src="$utils.imgUrl(item.articleContent.cover_img_url)"
              alt=""
            />
          </div>
          <div class="article-title" @click="toReadArticle(item)">
            <h4>{{ item.articleContent.article_title }}</h4>
          </div>
          <div class="article-tage">
            <el-tag size="mini" effect="dark" class="item-tag"
              ><i class="el-icon-folder-opened"></i>
              {{ item.articleContent.getArticleClassification.classification_name }}</el-tag
            >
            <el-tag
              size="mini"
              type="success"
              effect="dark"
              class="item-tag"
              v-for="(value, key) in item.articleContent.special"
              ><i class="el-icon-collection-tag"></i>
              {{ value.special_name }}</el-tag
            >
            <el-tag
              size="mini"
              type="info"
              class="item-tag"
              v-for="(value, key) in item.articleContent.label"
              ><i class="el-icon-s-flag"></i>{{ value.label_name }}</el-tag
            >
          </div>
          <div class="article-time">
            <div class="time">
              <span>{{
                $utils.getPastTimes(item.articleContent.create_time)
              }}</span>
            </div>
            <div class="other">
              <span class="other-item"
                ><i class="el-icon-chat-dot-square"></i> {{item.articleContent.articleCommentNum}}</span
              >
              <span class="other-item"
                ><i class="el-icon-view"></i>
                {{ item.articleContent.browse_num }}</span
              >
              <span class="other-item"
                ><i class="el-icon-star-off"></i>
                {{ item.articleContent.thumbs_num }}</span
              >
              <span class="other-item"
                ><i class="el-icon-collection-tag"></i>
                {{ item.articleContent.collection_num }}</span
              >
              <!-- <el-dropdown
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
              </el-dropdown> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserArticleCollection } from "@/api/article/articleList";
export default {
  name: "Collection",
  data() {
    return {
      //文章数据
      articleList: [],

      //没有数据图片
      notDataImg: require("@/assets/notData/notData.png"),
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //数据初始化
      getUserArticleCollection().then((res) => {
        this.articleList = Object.assign([], res.data);
        console.log(this.articleList);
      });
    },

    /**
     * 去阅读文章
     */
    toReadArticle(item) {
      this.$router.push({
        name: "ReadArticle",
        query: { id: item.article_id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  background-color: #f5f6f7;
  .container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 100%;
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
        box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.22), 0 0 6px rgba(0, 0, 0, 0.14);
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
</style>