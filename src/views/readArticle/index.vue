<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-08-11 15:31:23
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-25 21:22:11
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
            <!-- <a href="#article-comment" class="comment-anchor">
              {{ commentNum }}</a
            > -->
          </span>
          <span class="other-item"
            ><i class="el-icon-view"></i> {{ articleData.browse_num }}
          </span>

          <span
            class="other-item"
            @click="changeThumbs()"
            :class="{ 'thumbs-item': articleData.isThumbs }"
            ><i class="el-icon-star-on" v-if="articleData.isThumbs"></i
            ><i class="el-icon-star-off" v-else></i>
            {{ articleData.thumbs_num }}
          </span>
          <span class="other-item" @click="changeCollection()"
            ><i class="el-icon-collection-tag"></i> 0
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
      <!-- 文章版权 -->
      <div class="article-copyright" v-if="!isAuthor">
        <p>© 版权声明</p>
        <p>分享是一种美德，转载请保留原链接。</p>
        <p>
          当前链接：<span>
            <el-link :href="articleLink" type="primary">{{
              articleLink
            }}</el-link></span
          >
        </p>
      </div>
      <!-- 文章分类 -->
      <div class="article-tag">
        <p>
          <el-tag size="mini" effect="dark" class="item-tag"
            ><i class="el-icon-folder-opened"></i>
            {{
              articleData.getArticleClassification.classification_name
            }}</el-tag
          >
        </p>
        <p>
          <el-tag
            size="mini"
            type="success"
            effect="dark"
            class="item-tag"
            v-for="(value, key) in articleData.special"
            ><i class="el-icon-collection-tag"></i>
            {{ value.special_name }}</el-tag
          >
        </p>
        <p>
          <el-tag
            size="mini"
            type="info"
            class="item-tag"
            v-for="(value, key) in articleData.label"
            ><i class="el-icon-collection-tag"></i>
            {{ value.label_name }}</el-tag
          >
        </p>
      </div>
      <!-- 评论 -->
      <div class="article-comment" id="article-comment">
        <comment
          :avatar="$utils.imgUrl(userInfo.avatar_url)"
          :authorId="articleData.getUserInfo.id"
          :label="'作者'"
          :commentNum="commentNum"
          :commentList="commentList"
          @doSend="doSend($event)"
          @doChidSend="doChidSend(arguments)"
        ></comment>
      </div>
    </div>
  </div>
</template>

<script>
//引入markdown富文本编辑器
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

//评论组件
import comment from "@/components/comment/index.vue";
import { readArticleContent } from "@/api/article/articleList";
import {
  sendArticleComment,
  getArticleComment,
} from "@/api/article/articleComment";
import {
  addArticleBrowse,
  changeArticleThumbs,
} from "@/api/article/recommendArticle";
export default {
  name: "ReadArticle",
  components: {
    mavonEditor,
    comment,
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

        //是否已点赞
        isThumbs: false,

        //文章专题
        special: [],

        //文章标签
        label: [],

        //文章分类
        getArticleClassification: {},
      },

      //定时器
      timer: "",

      //当前用户信息
      userInfo: {
        id: 0,
        avatar_url:
          "uploads/admin/1/images/2021/08/18/462d9a7f1bc5909f111f230cdeaf78bc.jpg",
      },

      //文章链接
      articleLink: "",

      //判断是不是作者
      isAuthor: false,

      //评论数据
      commentList: [],

      //评论数量
      commentNum: 0,
    };
  },
  created() {
    if (this.$store.getters.userInfo) {
      this.userInfo = this.$store.getters.userInfo.user;
    } else {
      this.userInfo.id = 0;
    }

    this.articleId = this.$route.query.id;
    this.init();
  },
  methods: {
    init() {
      //页面初始化 获取除文章评论外所有的数据
      readArticleContent({ articleId: this.articleId }).then((res) => {
        this.articleData = Object.assign({}, res.data);
        if (this.articleData.user_id != this.userInfo.id) {
          this.isAuthor = false;
        } else {
          this.isAuthor = true;
        }
        //获取当前完整路径
        this.articleLink = window.location.href;
        return;
        //阅读时间为5秒
        if (this.articleData.user_id != this.userInfo.id) {
          this.timer = setTimeout(this.reading, 5000);
        }
      });

      //获取文章评论
      const aricleData = { article_id: this.articleId };
      getArticleComment(aricleData).then((res) => {
        this.commentList = Object.assign([], res.data);

        //获取文章评论数量
        this.commentNum = this.getCommentList(this.commentList);
      });
    },

    /**
     * 获取评论条数
     */
    getCommentList(item) {
      let num = item.length;
      item.forEach((value) => {
        if (value.children) {
          num += this.getCommentList(value.children);
        }
      });
      return num;
    },

    /**
     * 初始输入框的发送事件
     */
    doSend(content) {
      if (content == "") {
        this.$message.error("请输入评论的内容");
        return;
      }
      const data = {
        parent_id: 0,
        user_id: this.userInfo.id,
        reply_id: 0,
        content,
        article_id: this.articleId,
      };
      sendArticleComment(data).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "评论提交成功",
            message: "你的评论管理员将在客服审核后给予你回复",
            type: "success",
          });
        }
      });
    },

    /**
     * 子级回复评论
     */
    doChidSend(item) {
      const data = {
        content: item[0], //文章内容
        reply_id: item[1], //回复ID
        parent_id: item[2], //父级ID
        user_id: this.userInfo.id, //评论者ID
        article_id: this.articleId, //文章ID
      };
      if (data.content == "") {
        this.$message.error("请输入评论的内容");
        return;
      }
      sendArticleComment(data).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "评论提交成功",
            message: "你的评论管理员将在客服审核后给予你回复",
            type: "success",
          });
        }
      });
    },

    /**
     * 文章点赞
     */
    changeThumbs() {
      const data = {
        article_id: this.articleData.id,
      };
      changeArticleThumbs(data).then((res) => {
        if (res.code == 200) {
          if (this.articleData.isThumbs) {
            this.articleData.thumbs_num--;
          } else {
            this.articleData.thumbs_num++;
          }
          this.articleData.isThumbs = !this.articleData.isThumbs;
        }
      });

      
    },

    /**
     * 收藏文章
     */
    changeCollection(){
       const data = {
        article_id: this.articleData.id,
      };
    },


    /**
     * 返回上一页
     */
    goBack() {
      this.$router.go(-1);
    },

    /**
     * 阅读时间达标
     */
    reading() {
      const data = { id: this.articleData.id };
      addArticleBrowse(data).then((res) => {
        if (res.code == 200) {
          this.articleData.browse_num++;
        }
      });
    },
  },

  //页面销毁 清除定时器
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;

  border-radius: 5px;
  overflow: hidden;
  .container {
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: #fff;
    margin-bottom: 20px;
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
          .comment-anchor {
            text-decoration: none;
            color: #4e5358;
          }
        }
        .thumbs-item {
          color: #ebe15b;
        }
      }
    }
    .article-container {
      max-height: 500px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .article-copyright {
      width: 100%;
      text-align: left;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .article-tag {
      text-align: left;
      width: 100%;
      margin-bottom: 10px;
      p {
        margin-top: 5px;
      }
      .item-tag {
        margin-right: 3px;
      }
    }
    .article-comment {
      z-index: 100;
      margin-bottom: 10px;
      width: 100%;
    }
  }
}
</style>