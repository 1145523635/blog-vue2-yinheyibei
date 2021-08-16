<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-12 16:44:04
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-15 19:35:09
-->
<template>
  <div class="app-container">
    <div class="contaier">
      <!-- 头部图片 -->
      <div class="header">
        <img
          class="header-img"
          :src="userInfoBackground"
          :alt="userInfoBackground"
        />
      </div>
      <!-- 用户基本信息 -->
      <div class="user-info">
        <!-- 用户头像 -->
        <div class="user-avatar">
          <div class="avatar">
            <img
              class="avatar-img"
              :src="$utils.imgUrl(userInfoAvatar, isNetImg)"
              alt="用户头像"
            />
          </div>
        </div>
        <!-- 用户名称 -->
        <div class="user-name">
          <span>{{ userNickname }}</span>
        </div>
      </div>
      <!-- 用户登录 -->
      <div class="user-login">
        <div class="login-btn">
          <div v-if="!havaUserInfo">
            <el-button
              type="primary"
              icon="el-icon-right"
              size="mini"
              @click="login"
              >登录</el-button
            >
            <el-button
              type="success"
              icon="el-icon-user"
              size="mini"
              @click="register"
              >注册</el-button
            >
          </div>
          <div v-else>
            <el-button
              type="primary"
              icon="el-icon-star-off"
              size="mini"
              @click="toUserInfo"
              >个人中心</el-button
            >
            <el-button
              type="success"
              icon="el-icon-document"
              size="mini"
              v-show="nowRoutePath"
              @click="toWriteArticle"
              >写文章</el-button
            >
          </div>
        </div>
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
      //用户背景
      userInfoBackground: require("@/assets/user/userInfo.png"),

      //用户默认头像
      userInfoAvatar: require("@/assets/user/user-avatar.png"),

      //判断是否是本地图片
      isNetImg: true,

      //用户名
      userNickname: "未登录",

      //判断是否存在用户信息 || 用户登录
      havaUserInfo: false,

      //当前路由  用来控制写文章按钮的显示、隐藏
      nowRoutePath: true,
    };
  },
  created() {

    if (this.userInfo && this.userInfo.user.avatar_url != undefined) {
      this.havaUserInfo = true;
      this.isNetImg = false;
      this.userNickname = this.userInfo.user.nickname;
      this.userInfoAvatar = this.userInfo.user.avatar_url;
    }
  },

  methods: {
    login() {
      this.$Login("login");
    },

    register() {
      this.$Login("register");
    },
    toUserInfo() {
      this.$router.push("/user");
    },
    toWriteArticle() {
      this.$router.push("/release");
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    userInfo(newVal) {
      if (newVal) {
        this.isNetImg = false;
        this.havaUserInfo = true;
        this.userNickname = newVal.user.nickname;
        this.userInfoAvatar = newVal.user.avatar_url;
      } else {
        this.isNetImg = true;
        this.havaUserInfo = false;
        this.userNickname = "未登录";
        this.userInfoAvatar = require("@/assets/user/user-avatar.png");
      }
    },
    //监听路由 控制发布文章的显示 隐藏
    $route: {
      handler: function (to) {
        if (to.path == "/release") {
          this.nowRoutePath = false;
        } else {
          this.nowRoutePath = true;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 300px;
  display: flex;
  z-index: 0;
  justify-content: center;
  .contaier {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    height: 500px;
    background: #fff;
    .header {
      width: 100%;
      height: 200px;
      .header-img {
        width: 100%;
        height: 100%;
      }
    }
    .user-info {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
      margin-bottom: 20px;
      .user-avatar {
        position: absolute;
        top: -50px;
        width: 100%;
        display: flex;
        justify-content: center;
        .avatar {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #00a2e3;
          .avatar-img {
            width: 100%;
            height: 100%;
            transition: 1s;
            cursor: pointer;
          }
          .avatar-img:hover {
            transform: rotate(360deg) scale(1.5);
          }
        }
      }
      .user-name {
        width: 100%;
        margin-top: 70px;
        font-weight: 600;
      }
    }
    .user-login {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>