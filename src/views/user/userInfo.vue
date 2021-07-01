<!--
 * @Descripttion: 用户信息页面
 * @Author: 银河以北
 * @Date: 2021-07-01 16:34:02
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-01 22:46:59
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 正上方永不背景图 -->
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
      <div class="menu-link"></div>
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
    console.log(this.userInfos);
  },
  computed: {
    ...mapGetters(["userInfo"]),
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
      border-radius: 20px;
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
  }
}
</style>
