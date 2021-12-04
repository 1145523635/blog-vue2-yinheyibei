<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-11-30 09:33:59
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-12-04 13:48:29
-->
<template>
  <div class='app-container'>
    <div class='header'>
      <div class='header-img'>
        <img
          src='@/assets/defaultData/other/messageHeader.jpg'
          alt=""
          style="width:100%;height:100%"
        >
        <div class='message-text'>
          <div>
            <p>留言板</p>
          </div>
          <div class='under-line'>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class='title-container'>
      <h4 style="margin-bottom:10px"> 欢迎留言</h4>
      <p class='container'>对本站有什么建议或是期待？欢迎留言谈论~</p>
    </div>
    <div class='message-container'>
      <div class='comment'>
        <comment
          :avatar="$utils.imgUrl(userInfo.avatar_url)"
          :authorId="1"
          :label="'作者'"
          :commentNum="pages.total"
          :commentList="commentList"
          @doSend="doSend($event)"
          @doChidSend="doChidSend(arguments)"
        ></comment>
      </div>
      <!-- 加载更多 -->
      <div class="get-more"><span
          @click="getMore()"
          v-if="isHave"
        >加载更多</span>
        <span v-else>我也是有底线的</span></span>
      </div>

    </div>

  </div>
</template>

<script>
//评论组件
import comment from "@/components/comment/index.vue";

//API
import { publishMessage, getMessageList } from "@/api/messsage/index";
export default {
  name: "Message",
  components: {
    comment,
  },
  data() {
    return {
      //评论数据
      commentList: [],

      //用户信息
      userInfo: {},

      //分页参数
      pages: {
        list_rows: 10, //每页数量
        page: 1, //当前页
        total: 0,
      },

      //判断是否还有
      isHave: true,
    };
  },
  created() {
    if (this.$store.getters.userInfo) {
      this.userInfo = this.$store.getters.userInfo.user;
    }
    this.init();
  },
  methods: {
    /* 页面数据初始化 */
    init() {
      const query = {
        list_rows: this.pages.list_rows,
        page: this.pages.page,
      };
      getMessageList(query).then((res) => {
        this.commentList.push(...res.data.data);
        this.pages.total = res.data.total;
        if (this.pages.list_rows * this.pages.page >= res.data.total) {
          this.isHave = false;
        } else {
          this.isHave = true;
        }
      });
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
        // article_id: this.articleId,
      };
      publishMessage(data).then((res) => {
        if (res.code == 200) {
          this.init();
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
      console.log(item);
      // return;
      const data = {
        content: item[0], //文章内容
        reply_id: item[1], //回复ID
        parent_id: item[2], //父级ID
        user_id: this.userInfo.id, //评论者ID
      };
      if (data.content == "") {
        this.$message.error("请输入评论的内容");
        return;
      }
      publishMessage(data).then((res) => {
        if (res.code == 200) {
          this.init();
          this.$notify({
            title: "评论提交成功",
            message: "你的评论管理员将在客服审核后给予你回复",
            type: "success",
          });
        }
      });
    },

    /* 获取跟多 */
    getMore() {
      this.pages.page++;
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  .header {
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    .header-img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      .message-text {
        position: absolute;
        color: #ffffff;
        top: 50%;
        left: 50%;
        text-align: center;
        font-size: 24px;
        transform: translate(-50%, -50%);
        .under-line {
          width: 100%;
          display: flex;
          justify-content: center;
          div {
            width: 70px;
            height: 3px;
            background: #18b2ff;
            margin-top: 5px;
            border-radius: 20px;
          }
        }
      }
    }
  }
  .title-container {
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    color: #409eff;
    margin-bottom: 20px;
    .container {
      width: 100%;
      font-size: 12px;
      font-weight: 600;
    }
  }
  .message-container {
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    margin-bottom: 20px;
  }
  .get-more {
    width: 100%;
    text-align: center;
    font-size: 14px;
    span {
      cursor: pointer;
    }
  }
}
</style>