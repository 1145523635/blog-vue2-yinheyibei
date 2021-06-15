<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-12 16:44:04
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-15 14:25:06
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
            <img class="avatar-img" :src="userInfoAvatar" alt="" />
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
            >登录</el-button
          >
          <el-button type="success" icon="el-icon-user" size="mini"
            >注册</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userInfoBackground: require("@/assets/user/userInfo.png"),
      userInfoAvatar: require("@/assets/user/user-avatar.png"),
    };
  },
  methods: {
    login() {
      this.$Login();
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