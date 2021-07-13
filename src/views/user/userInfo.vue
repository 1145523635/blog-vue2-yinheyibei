<!--
 * @Descripttion: 用户信息页面
 * @Author: 银河以北
 * @Date: 2021-07-01 16:34:02
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-13 16:10:31
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 正上方用户背景图 -->
      <div class="user-cover">
        <img class="cover-img" :src="userCover" alt="用户背景图" />
        <!-- 用户基本信息 -->
        <div class="user-info">
          <!-- 用户头像 -->
          <div class="user-avatar">
            <img
              class="user-avatar-img"
              :src="$utils.imgUrl(userInfos.avatar_url)"
              alt=""
            />
          </div>
          <!-- 用户姓名 -->
          <div class="user-name">
            <h2>{{ userInfos.nickname }}</h2>
            <p>文章<span>1</span> | 评论 <span>2</span></p>
            <p>这家伙很懒，什么都没有写...</p>
          </div>
        </div>
      </div>

      <!-- 菜单导航 -->
      <div class="menu-link">
        <div class="link-item">
          <div class="item">
            <router-link tag="div" :to="{ name: 'Release' }"
              ><span style="margin-right: 5px"
                ><i class="el-icon-document-checked"></i
              ></span>
              发布</router-link
            >
          </div>
          <div class="item">
            <router-link tag="div" :to="{ name: 'Collection' }"
              ><span style="margin-right: 5px"
                ><i class="el-icon-star-off"></i></span
              >收藏</router-link
            >
          </div>
          <div class="item">
            <router-link tag="div" :to="{ name: 'Comment' }"
              ><span style="margin-right: 5px">
                <i class="el-icon-chat-dot-round"></i
              ></span>
              评论</router-link
            >
          </div>
          <div class="item">
            <router-link tag="div" :to="{ name: 'Follow' }"
              ><span style="margin-right: 5px">
                <i class="el-icon-view"></i></span
              >关注</router-link
            >
          </div>
          <div class="item">
            <router-link tag="div" id="personal" :to="{ name: 'Personal' }"
              ><span style="margin-right: 5px">
                <i class="el-icon-user"></i></span
              >个人资料</router-link
            >
          </div>
        </div>
      </div>
      <!-- 子级路由展示 -->
      <div class="router-view">
        <transition name="el-zoom-in-center" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "UserInfo",
  data() {
    return {
      //背景图片
      userCover: require("@/assets/user/user-cover.png"),

      //用户信息
      userInfos: {},
    };
  },
  created() {
    this.userInfos = this.userInfo.user;
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.path;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .container {
    min-width: 1000px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .user-cover {
      width: 100%;
      height: 370px;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      .cover-img {
        width: 100%;
        height: 100%;
      }
      .user-info {
        width: 100%;
        height: 170px;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 20px;
        .user-avatar {
          width: 100px;
          height: 100px;
          overflow: hidden;
          margin-right: 30px;
          .user-avatar-img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .user-name {
          text-align: left;
          color: #ffffff;
        }
      }
    }
    .menu-link {
      width: 100%;
      display: flex;
      height: 50px;
      background: #ffffff;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 10px;
      overflow: hidden;
      align-items: center;
      .link-item {
        display: flex;
        align-items: center;
        .item {
          width: 100px;
          cursor: pointer;
          height: 30px;
          line-height: 30px;
          border-radius: 20px;
          background-color: #ffffff;
          color: #4e5358;
        }
        // 活动路由样式
        .router-link-exact-active {
          width: 100px;
          cursor: pointer;
          height: 30px;
          line-height: 30px;
          border-radius: 20px;
          background-color: #00a2e3;
          color: #ffffff;
        }
      }
    }
    .router-view {
      width: 100%;
      height: 500px;
      border-radius: 10px;
      overflow: hidden;
      background: #ffffff;
      margin-bottom: 20px;
    }
  }
}
</style>
