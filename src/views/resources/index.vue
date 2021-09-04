<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-26 21:17:48
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-09-01 20:35:19
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 头部背景 -->
      <div class="header-container">
       
        <el-image
          style="width: 100%; height: 100%"
          fit="cover"
          :src="$utils.imgUrl(imgContent.imgUrl)"
        >
        </el-image>
        <div class='describe'>
          <div>
            <h4><i class="el-icon-edit" v-if='imgContent.status==0'></i>
            <i class="el-icon-folder-opened" v-if='imgContent.status==1'></i>
            <i class="el-icon-collection-tag" v-if='imgContent.status==2'></i>
            <i class="el-icon-s-flag" v-if='imgContent.status==3'></i> {{imgContent.text}}</h4>
            <p>{{imgContent.describe}}</p>
          </div>
        </div>
      </div>
      <!-- 过滤方法 -->
      <div class="filter-container">
        <!-- 文章分类过滤 -->
        <div
          class="filter-classification"
          v-if="optionsData.classification.length > 0"
        >
          <div class="filter-header">
            <i class="el-icon-folder-opened"></i> 分类
            <span class="division">|</span>
          </div>
          <div class="filter-item" v-if="optionsData.classification">
            <span
              v-for="(item, index) in optionsData.classification"
              :key="index"
              @click="changeClassificationFilter(item)"
              :class="{
                'actice-item': item.id == filterForm.article_classification,
              }"
              >{{ item.classification_name }}</span
            >
          </div>
        </div>
        <!-- 文章专题过滤 -->
        <div
          class="filter-classification"
          v-if="optionsData.special.length > 0"
        >
          <div class="filter-header">
            <i class="el-icon-collection-tag"></i> 专题
            <span class="division">|</span>
          </div>
          <div class="filter-item" v-if="optionsData.special">
            <span
              v-for="(item, index) in optionsData.special"
              :key="index"
              @click="changeSpecialFilter(item)"
              :class="{
                'actice-item': filterForm.article_special.includes(item.id),
              }"
              >{{ item.special_name }}</span
            >
          </div>
        </div>
        <!-- 文章标签 -->
        <div class="filter-classification" v-if="optionsData.label.length > 0">
          <div class="filter-header">
            <i class="el-icon-s-flag"></i> 标签 <span class="division">|</span>
          </div>
          <div class="filter-item" v-if="optionsData.label">
            <span
              v-for="(item, index) in optionsData.label"
              :key="index"
              @click="changeLabelFilter(item)"
              :class="{
                'actice-item': filterForm.article_label.includes(item.id),
              }"
              >{{ item.label_name }}</span
            >
          </div>
        </div>
      </div>
      <!-- 内容展示 -->
      <div class="article-container">
        <!-- 没有数据 -->
        <div class="no-data" v-if="articleList.length == 0">
          <div><span>找不到文章咯！</span></div>
        </div>
        <!-- 数据展示 -->
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
                  ><i class="el-icon-chat-dot-square"></i> {{item.articleCommentNum}}</span
                >
                <span class="other-item"
                  ><i class="el-icon-view"></i> {{ item.browse_num }}</span
                >
                <span class="other-item"
                  ><i class="el-icon-star-off"></i> {{ item.thumbs_num }}</span
                >
                 <span class="other-item"
                  ><i class="el-icon-collection-tag"></i> {{ item.collection_num }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 加载跟多按钮 -->
        <div class="load-more">
          <el-button :type="showGetMoreBtn?'primary':'info'" round size="mini" @click="getMoreArticle()" :disabled='!showGetMoreBtn'><span v-if='showGetMoreBtn'>加载更多</span><span v-else>没有更多了</span></el-button></el-button>
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
      //过滤数据
      optionsData: {
        classification: [], //文章分类
        special: [], //文章专题
        label: [], //文章标签
      },

      //文章数据
      articleList: [],

      //过滤表单
      filterForm: {
        article_classification: "",
        article_special: [],
        article_label: [],
      },

      //分页参数
      pages: {
        list_rows: 3,
        page: 0,
      },

      //显示加载跟多按钮
      showGetMoreBtn: true,

      //顶部图片展示内容
      imgContent: {
        imgUrl:
          "uploads/admin/1/images/2021/08/22/19df673cbc103121dd01ad3189a31159.png",
        text: "洞幽察微",
        describe: "相信奇迹的人，一定也和奇迹一样了不起吧！",
        status: 0,
      },
    };
  },
  created() {
    this.configData();
    this.init(true);
  },
  methods: {
    //初始化函数
    init(status = true) {
      const query = Object.assign({}, this.filterForm, this.pages);
      //文章数据
      getRecommendArticle(query).then((res) => {
        if (status) {
          this.articleList = Object.assign([], res.data);
        } else {
          if (res.data.length > 0) {
            this.articleList = this.articleList.concat(res.data);
          }
        }
        if (res.data.length < this.pages.list_rows) {
          this.showGetMoreBtn = false;
        }
      });
    },

    //更改过滤表单参数 （文章分类）
    changeClassificationFilter(item) {
      this.imgContent.imgUrl = item.cover_url;
      this.imgContent.describe = item.classification_describe;
      this.imgContent.text = item.classification_name;
      this.imgContent.status = 1;
      if (item.id == this.filterForm.article_classification) {
        this.filterForm.article_classification = "";
      } else {
        this.filterForm.article_classification = item.id;
      }
    },

    //更改过滤表单参数 （文章专题）
    changeSpecialFilter(item) {
      this.imgContent.imgUrl = item.cover_url;
      this.imgContent.describe = item.special_describe;
      this.imgContent.text = item.special_name;
      this.imgContent.status = 2;
      const index = this.filterForm.article_special.indexOf(item.id);
      if (index == -1) {
        this.filterForm.article_special.push(item.id);
      } else {
        this.filterForm.article_special.splice(index, 1);
      }
    },

    //更改过滤表单参数 （文章标签）
    changeLabelFilter(item) {
      this.imgContent.imgUrl = item.cover_url;
      this.imgContent.describe = item.label_describe;
      this.imgContent.text = item.label_name;
      this.imgContent.status = 3;
      const index = this.filterForm.article_label.indexOf(item.id);
      if (index == -1) {
        this.filterForm.article_label.push(item.id);
      } else {
        this.filterForm.article_label.splice(index, 1);
      }
    },

    //查看详细文章
    toReadArticle({ id }) {
      this.$router.push({ name: "ReadArticle", query: { id } });
    },

    //加载更多文章
    getMoreArticle() {
      this.pages.page++;
      this.init(false);
    },

    //配置数据函数
    configData() {
      //获取过滤数据
      getArticleReleaseOption().then((res) => {
        this.optionsData = Object.assign({}, res.data);
      });
    },
  },
  watch: {
    filterForm: {
      handler() {
        this.showGetMoreBtn = true;
        this.pages.page = 0;
        this.init(true);
      },
      deep: true,
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
      position: relative;
      .describe {
        position: absolute;
        text-align: center;
        color: #fff;
        top: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 0 0 5px #000;
        cursor: pointer;
        h4:hover {
          color: #409eff;
        }
        p {
          font-size: 13px;
        }
      }
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
        .actice-item {
          color: #409eff;
          font-weight: 600;
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
          width: 263px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background: #fff;
          border-radius: 5px;
          overflow: hidden;
          transition: 0.5s;
          margin-right: 10px;
          margin-bottom: 10px;
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
      .load-more {
        width: 100%;
      }
    }
  }
}
</style>