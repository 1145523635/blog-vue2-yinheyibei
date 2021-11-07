<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-08-11 20:42:10
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-11-06 22:11:27
-->
<template>
  <div class="app-container">
    <div class="container">
      <div
        class="not-data"
        v-if="noticeList.length == 0"
      >
        <div class="img-container">
          <img
            width="100%"
            :src="notDataImg"
            :alt="notDataImg"
          />
        </div>
      </div>
      <div
        class="info-container"
        v-else
      >
        <!-- 消息通知列表 -->
        <div class="left-link">
          <div class="item-container">
            <div
              class="link-item"
              v-for="(item, index) in noticeList"
              :key="index"
              @click="changeMenu(item)"
            >
              <p :class="{
                  'router-link-exact-active': item.id == activeNoticId,
                }">
                <span
                  v-if="isNotRead.includes(item.id)"
                  style="color: #e6a23c"
                ><i class="el-icon-warning"></i></span>
                <span
                  v-else
                  style="color: #67c23a"
                ><i class="el-icon-success"></i></span>
                <span v-if="item.type == 1">文章审核</span>
                <span v-if="item.type == 2">资源审核</span>
              </p>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, total, next"
              :total="pages.total"
              style="width: 100%"
              @prev-click="prevClick"
              @next-click="nextClick"
            >
            </el-pagination>
          </div>
        </div>

        <!-- 右边内容展示 -->
        <div class="right-container">
          <div class="notice-container">
            <div class="time">
              <p class="delete-notice">
                <i
                  class="el-icon-delete"
                  @click="deleteNotice"
                ></i>
              </p>
              <p>{{ noticeTime }}</p>
            </div>
            <span>{{ noticeContent }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeList, isReadNotice, deleteNotice } from "@/api/user/notice";
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

      //分页参数
      pages: {
        list_rows: 10,
        page: 1,
        total: 0,
      },

      //没有数据图片
      notDataImg: require("@/assets/notData/notData.png"),

      //定时器
      timer: null,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.activeNoticId = this.$route.query.id;
    }

    this.init();
  },

  methods: {
    init() {
      //页面初始化数据
      const query = Object.assign({}, this.pages);
      getNoticeList(query).then((res) => {
        /* 默认赋值 */

        res.data.data.forEach((item) => {
          if (item.is_read == 0) {
            this.isNotRead.push(item.id);
          }
          //如果有默认活动消息ID 则赋对应的值
          if (item.id == this.activeNoticId) {
            this.noticeContent = item.notice;
            this.noticeTime = item.create_time.slice(0, 10);
          }
        });

        //如果没有默认的活动消息ID是0 则赋默认值
        if (this.noticeContent == 0) {
          this.noticeContent = res.data.data[0].notice;
          this.activeNoticId = res.data.data[0].id;
          this.noticeTime = res.data.data[0].create_time.slice(0, 10);
        }
        this.noticeList = Object.assign([], res.data.data);
        this.pages.total = res.data.total;
      });
    },

    //删除消息
    async deleteNotice() {
      const dataLen = this.noticeList.length;
      let activeNoticIdIndex = 0;
      this.noticeList.forEach((item, index) => {
        if (this.activeNoticId == item.id) {
          activeNoticIdIndex = index + 1;
        }
      });
      const res = await deleteNotice({ id: this.activeNoticId });
      if (res.code == 200) {
        if (activeNoticIdIndex == dataLen) {
          if (dataLen == 1) {
            this.activeNoticId = 0;
          } else {
            this.activeNoticId = this.noticeList[activeNoticIdIndex - 2].id;
            this.noticeContent = this.noticeList[activeNoticIdIndex - 2].notice;
            this.noticeTime = this.noticeList[
              activeNoticIdIndex - 2
            ].create_time.slice(0, 10);
          }
          this.noticeList.pop();
        } else {
          this.activeNoticId = this.noticeList[activeNoticIdIndex].id;
          this.noticeContent = this.noticeList[activeNoticIdIndex].notice;
          this.noticeTime = this.noticeList[
            activeNoticIdIndex
          ].create_time.slice(0, 10);
          this.noticeList.splice(activeNoticIdIndex - 1, 1);
        }
        this.$notify({
          title: "成功",
          message: "消息删除成功",
          type: "success",
        });
      }
    },

    //切换通知消息
    changeMenu({ id, notice, create_time }) {
      if (id != this.activeNoticId) {
        this.activeNoticId = id;
        this.noticeContent = notice;
        this.noticeTime = create_time.slice(0, 10);
      }
    },

    //分页参数回调
    prevClick(value) {
      this.pages.page = value;
      this.init();
    },
    nextClick(value) {
      this.pages.page = value;
      this.init();
    },
  },
  watch: {
    activeNoticId(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // return;
        isReadNotice({ id: value }).then((res) => {
          this.isNotRead = this.isNotRead.filter((item) => {
            return item != value;
          });
        });
      }, 5000);
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
    .info-container {
      width: 100%;
      margin-top: 0;
      display: flex;
      justify-content: space-between;
      .left-link {
        width: 200px;
        min-height: 200px;
        border-right: 1px solid #e8e8e8;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-container {
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

        .pagination {
          width: 100%;
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
          .delete-notice {
            margin-bottom: 10px;
            color: #000;
            cursor: pointer;
          }
          .delete-notice :hover {
            color: red;
          }
        }
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