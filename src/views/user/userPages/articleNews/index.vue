<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-08-11 20:42:10
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-14 23:19:09
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 消息通知列表 -->
      <div class="left-link">
        <div
          class="link-item"
          v-for="(item, index) in noticeList"
          :key="index"
          @click="changeMenu(item)"
        >
          <p
            :class="{
              'router-link-exact-active': item.id == activeNoticId,
            }"
          >
            <span v-if="isNotRead.includes(item.id)" style="color: #e6a23c"
              ><i class="el-icon-warning"></i
            ></span>
            <span v-else style="color: #67c23a"
              ><i class="el-icon-success"></i
            ></span>
            <span v-if="item.type == 1">文章审核</span>
          </p>
        </div>
      </div>
      <!-- 右边内容展示 -->
      <div class="right-container">
        <div class="notice-container">
          <p class="time">{{ noticeTime }}</p>
          <span>{{ noticeContent }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeList, isReadNotice } from "@/api/user/notice";
export default {
  name: "ArticleNews",
  data() {
    return {
      //当前选中的通知消息
      activeNoticId: 0,

      //消息通知列表
      noticeList: [],

      //消息通知内容
      noticeContent: "",

      //消息通知时间
      noticeTime: "",

      //没有阅读的通知消息ID
      isNotRead: [],
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      //页面初始化数据
      getNoticeList().then((res) => {
        /* 默认赋值 */
        this.noticeContent = res.data[0].notice;
        this.activeNoticId = res.data[0].id;
        this.noticeTime = res.data[0].create_time.slice(0, 10);
        res.data.forEach((item) => {
          if (item.is_read == 0) {
            this.isNotRead.push(item.id);
          }
        });
        this.noticeList = Object.assign([], res.data);
      });
    },

    //切换通知消息
    changeMenu({ id, notice, create_time }) {
      if (id != this.activeNoticId) {
        this.activeNoticId = id;
        this.noticeContent = notice;
        this.noticeTime = create_time.slice(0, 10);
      }
    },
  },
  watch: {
    activeNoticId(value) {
      isReadNotice({ id: value }).then((res) => {
        this.isNotRead = this.isNotRead.filter((item) => {
          return item != value;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: top;
    height: 100%;
    .left-link {
      width: 200px;
      min-height: 200px;
      border-right: 1px solid #e8e8e8;
      height: 100%;
      .link-item {
        width: 100%;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        text-align: right;
        width: 100%;
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
      height: 100%;
      .notice-container {
        margin: 20px;
        width: calc(100% - 40px);
        height: 450px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 4px;
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
      }
      .time {
        text-align: right;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>