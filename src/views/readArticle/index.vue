<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-08-11 15:31:23
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-11 20:37:43
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 文章标题 -->
      <div class="article-title">
        <div>
          <h2>{{ articleData.article_title }}</h2>
        </div>
        <div>
          <span class="back" @click="goBack"
            >返回 <i class="el-icon-s-home"></i>
          </span>
        </div>
      </div>
      <div class="article-info">
        <div class="user-info">
          <div class="user-avatar">
            <img
              width="100%"
              height="100%"
              :src="$utils.imgUrl(articleData.getUserInfo.avatar_url)"
              alt="作者头像"
            />
          </div>
          <div class="user-name">
            <h4>{{ articleData.getUserInfo.nickname }}</h4>
            <p>发布于 {{ $utils.getPastTimes(articleData.create_time) }}</p>
          </div>
        </div>
        <div class="article-data">
          <span class="other-item"
            ><i class="el-icon-chat-dot-square"></i> 0
          </span>
          <span class="other-item"
            ><i class="el-icon-view"></i> {{ articleData.browse_num }}
          </span>

          <span class="other-item"
            ><i class="el-icon-star-off"></i> {{ articleData.thumbs_num }}
          </span>
        </div>
      </div>
      <!-- 文章内容 -->
      <div class="article-container">
        <mavonEditor
          v-model="articleData.articleContent"
          ref="md"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :subfield="false"
          :scrollStyle="true"
          :editable="false"
          style="height: 100%; z-index: 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
//引入markdown富文本编辑器
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { readArticleContent } from "@/api/article/articleList";
export default {
  name: "ReadArticle",
  components: {
    mavonEditor,
  },
  data() {
    return {
      //文章ID
      articleId: undefined,

      //文章数据
      articleData: {
        //文章内容
        articleContent: "",

        //文章标题
        article_title: "",

        //文章发布时间
        create_time: "",

        //文章点赞
        thumbs_num: 0,

        //文章浏览
        browse_num: 0,

        //作者信息
        getUserInfo: {},
      },
    };
  },
  created() {
    this.articleId = this.$route.query.id;
    this.init();
  },
  methods: {
    init() {
      //页面初始化
      readArticleContent({ articleId: this.articleId }).then((res) => {
        this.articleData = Object.assign({}, res.data);
      });
    },

    /**
     * 返回上一页
     */
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;

  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  .container {
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .article-title {
      width: 100%;
      text-align: left;
      font-size: 18px;
      font-weight: 700;
      color: #4e5358;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      h2:hover {
        color: #00a2e3;
      }
      .back {
        font-size: 14px;
        cursor: pointer;
        margin-right: 7px;
      }
      .back:hover {
        color: #00a2e3;
      }
    }
    .article-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .user-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        .user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
        }
        .user-name {
          text-align: left;
          p {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .article-data {
        background: #f5f6f7;
        padding: 7px;
        border-radius: 20px;
        cursor: pointer;
        .other-item {
          margin-right: 10px;
          font-size: 14px;
        }
      }
    }
    .article-container {
      max-height: 500px;
      overflow: hidden;
    }
  }
}
</style>