<!--
 * @Descripttion: 关注
 * @Author: 银河以北
 * @Date: 2021-09-12 20:23:27
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-22 19:08:49
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 关注 粉丝切换 -->
      <div class="follow-header">
        <div
          class="follow-item"
          :class="{ 'active-item': isFollow }"
          @click="isFollow = !isFollow"
        >
          关注 <span>{{ followUserList.length }}</span>
        </div>
        <div class="follow-division"></div>
        <div
          class="follow-item"
          :class="{ 'active-item': !isFollow }"
          @click="isFollow = !isFollow"
        >
          粉丝 <span>{{ fansUserList.length }}</span>
        </div>
      </div>
      <!-- 关注 粉丝数据内容 -->
      <!-- 关注 -->
      <div class="follow-container" v-if="isFollow">
        <div v-if="followUserList.length > 0">
          <div
            class="follow-item"
            v-for="(item, index) in followUserList"
            :key="index"
          >
            <div class="follow-background">
              <img
                :src="$utils.imgUrl(item.getFollowInfo.avatar_url)"
                width="100%"
                alt=""
              />
            </div>
            <div class="user-info">
              <div class="user-avatar">
                <img
                  :src="$utils.imgUrl(item.getFollowInfo.avatar_url)"
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
              <div class="user-name">
                <h4>
                  <span>{{ item.getFollowInfo.nickname }}</span>

                  <span
                    class="is-follow"
                    @click="followUser(item)"
                    v-if="item.isFollow"
                    ><i class="el-icon-error"></i>取消关注</span
                  >
                  <span class="not-follow" @click="followUser(item)" v-else
                    ><i class="el-icon-success"></i>点击关注</span
                  >
                </h4>
                <p class="user-autograph">
                  <span v-if="item.getFollowInfo.autograph">{{
                    item.getFollowInfo.autograph
                  }}</span
                  ><span v-else>这个人很懒，什么都没有留下</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-data">
          <div>
            <img :src="emptyFollows" alt="" />
            <p>暂无关注</p>
          </div>
        </div>
      </div>
      <!-- 粉丝 -->
      <div class="follow-container" v-else>
        <div v-if="fansUserList.length > 0">
          <div
            class="follow-item"
            v-for="(item, index) in fansUserList"
            :key="index"
          >
            <div class="follow-background">
              <img
                :src="$utils.imgUrl(item.getFansInfo.avatar_url)"
                width="100%"
                alt=""
              />
            </div>
            <div class="user-info">
              <div class="user-avatar">
                <img
                  :src="$utils.imgUrl(item.getFansInfo.avatar_url)"
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
              <div class="user-name">
                <h4>
                  <span>{{ item.getFansInfo.nickname }}</span>

                  <span
                    class="is-follow"
                    @click="followUser(item)"
                    v-if="item.isFollow"
                    ><i class="el-icon-error"></i>取消关注</span
                  >
                  <span class="not-follow" @click="followUser(item)" v-else
                    ><i class="el-icon-success"></i>点击关注</span
                  >
                </h4>
                <p class="user-autograph">
                  <span v-if="item.getFansInfo.autograph">{{
                    item.getFansInfo.autograph
                  }}</span
                  ><span v-else>这个人很懒，什么都没有留下</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-data">
          <div>
            <img :src="emptyFans" alt="" />
            <p>暂无粉丝</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { blogUserFollowUser, getUserFans } from "@/api/user/followUser";
import { getUserFollow } from "@/api/user/followUser";
export default {
  name: "Follow",
  data() {
    return {
      //判断当前是用户关注还是粉丝
      isFollow: true,

      //关注用户列表
      followUserList: [],

      //粉丝用户列表
      fansUserList: [],

      //没有粉丝图片
      emptyFans: require("@/assets/notData/notFans.png"),

      //没有关注图片
      emptyFollows: require("@/assets/notData/notFollows.png"),
    };
  },
  created() {
    this.isFollow = this.$route.query.isFollow;
    this.init();
  },
  methods: {
    init() {
      getUserFollow().then((res) => {
        res.data.forEach((item) => {
          item.isFollow = true;
        });
        this.followUserList = Object.assign([], res.data);
      });
      getUserFans().then((res) => {
        this.fansUserList = Object.assign([], res.data);
      });
    },

    //关注或取消用户
    followUser(item) {
      let follow_id = "";
      let userName = "";
      if (item.getFollowInfo) {
        follow_id = item.getFollowInfo.id;
        userName = item.getFollowInfo.nickname;
      } else {
        follow_id = item.getFansInfo.id;
        userName = item.getFansInfo.nickname;
      }
      blogUserFollowUser({ follow_id: follow_id }).then((res) => {
        if (res.code != 200) {
          return;
        }
        item.isFollow = !item.isFollow;
        if (!item.isFollow) {
          this.$notify({
            title: "成功",
            message: `你已成功取消关注${userName}`,
            type: "warning",
          });
        } else {
          this.$notify({
            title: "成功",
            message: `你已成功关注${userName}`,
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .container {
    width: 100%;
    height: 100%;
    padding: 10px;
    .follow-header {
      width: calc(100% - 20px);
      height: 40px;
      display: flex;
      justify-content: center;
      .follow-item {
        font-size: 14px;
        color: #b4b6bb;
        cursor: pointer;
      }
      .active-item {
        color: #3390ff;
      }
      .follow-division {
        width: 1px;
        height: 20px;
        background: #b4b6bb;
        border-radius: 20px;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    .follow-container {
      width: calc(100% - 20px);
      display: flex;
      justify-content: center;
      .follow-item {
        width: 230px;
        height: 65px;
        padding: 5px;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        .follow-background {
          opacity: 0.2;
          filter: blur(4px);
          width: 100%;
        }
        .user-info {
          position: absolute;
          top: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 5px;
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
          }
          .user-name {
            text-align: left;
            .user-autograph {
              width: 150px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #777;
              font-size: 12px;
              margin: 5px;
            }
            .is-follow {
              margin-left: 5px;
              color: #3390ff;
            }
            .not-follow {
              margin-left: 5px;
              color: #67c23a;
            }
          }
        }
      }
      .empty-data {
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        color: #b1b1b1;
        font-size: 12px;
        img {
          width: 200px;
          display: block;
        }
      }
    }
  }
}
</style>