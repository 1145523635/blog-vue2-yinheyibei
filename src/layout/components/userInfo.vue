<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-12 16:44:04
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-01 16:06:32
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
        <div class="user-name"><span>银河以北</span></div>
      </div>
      <!-- 用户登录 -->
      <div class="user-login">
        <div class="login-btn">
          <el-button
            type="primary"
            icon="el-icon-right"
            size="mini"
            @click="login"
            v-show="!havaUserInfo"
            >登录</el-button
          >
          <el-button
            type="success"
            icon="el-icon-user"
            size="mini"
            v-show="!havaUserInfo"
            >注册</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-star-off"
            size="mini"
            v-show="havaUserInfo"
            >个人中心</el-button
          >
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

      //判断是否存在用户信息 || 用户登录
      havaUserInfo: false,
    };
  },
  created() {
    if (this.userInfo && this.userInfo.user.avatar_url != undefined) {
      this.havaUserInfo = true;
      this.isNetImg = false;
      this.userInfoAvatar = this.userInfo.user.avatar_url;
    }
  },

  methods: {
    login() {
      this.$Login();
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
        this.userInfoAvatar = newVal.user.avatar_url;
      } else {
        this.isNetImg = true;
        this.havaUserInfo = false;
        this.userInfoAvatar = require("@/assets/user/user-avatar.png");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 300px;
  display: flex;

  justify-content: center;
  .contaier {
    width: 100%;
    border-radius: 20px;
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