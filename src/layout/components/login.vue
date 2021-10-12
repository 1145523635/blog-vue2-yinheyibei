<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-11 12:41:24
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-12 22:15:03
-->
<template>
  <div class="app-container">
    <div class="container">
      <el-popover
        placement="bottom-start"
        width="250"
        trigger="hover"
        :visible-arrow="false"
      >
        <div
          class="panel"
          slot=""
        >
          <div class="login-title">
            <h6 v-if="!isLogon && !hasUserInfo">登录方式</h6>
            <h6 v-else>{{ name }}</h6>
          </div>
          <div class="login-item">
            <div
              class="login-container"
              @click="toLogin"
              v-show="!isLogon && !hasUserInfo"
            >
              <div
                class="item-icon"
                style="background: #e9f4fe"
              >
                <i
                  class="el-icon-user"
                  style="color: #2997f7"
                ></i>
              </div>
              <div
                class="item-title"
                style="color: #2997f7"
              >
                <span>登录</span>
              </div>
            </div>
            <div
              class="login-container"
              @click="toRegister"
              v-show="!isLogon && !hasUserInfo"
            >
              <div
                class="item-icon"
                style="background: #eefaf0"
              >
                <i
                  class="el-icon-plus"
                  style="color: #18a52a"
                ></i>
              </div>
              <div
                class="item-title"
                style="color: #18a52a"
              >
                <span>注册</span>
              </div>
            </div>
            <div
              @click="toUserInfo"
              class="login-container"
              v-show="isLogon && hasUserInfo"
            >
              <div
                class="item-icon"
                style="background: #e9f4fe"
              >
                <i
                  class="el-icon-user"
                  style="color: #2997f7"
                ></i>
              </div>
              <div
                class="item-title"
                style="color: #2997f7"
              >
                <span>个人中心</span>
              </div>
            </div>
            <div
              class="login-container"
              @click="toLogOut"
              v-show="isLogon && hasUserInfo"
            >
              <div
                class="item-icon"
                style="background: #fef0f0"
              >
                <i
                  class="el-icon-right"
                  style="color: #f56c6c"
                ></i>
              </div>
              <div
                class="item-title"
                style="color: #f56c6c"
              >
                <span>退出</span>
              </div>
            </div>
          </div>
        </div>
        <div
          slot="reference"
          style="height: 60px"
          @click="toLogin"
        >
          <!-- 登录信息 -->
          <span
            style="line-height: 60px"
            v-if="!isLogon && !hasUserInfo"
          >登录
          </span>
          <!-- 获取用户信息 缓存登录图标 -->
          <i
            v-else-if="isLogon && !hasUserInfo"
            style="color: #00a2e3; line-height: 60px"
            class="el-icon-loading"
          ></i>
          <!-- 展示登录信息 -->
          <div
            v-else-if="isLogon && hasUserInfo"
            class="user-info"
          >
            <div style="margin-right: 10px">
              <el-avatar
                size="medium"
                :src="$utils.imgUrl(avatar)"
              ></el-avatar>
            </div>
            <div>
              <span style="line-height: 60px">
                {{ name }}
              </span>
            </div>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      isLogon: false,
      hasUserInfo: false,
      name: "登录",
      avatar: undefined,
    };
  },
  created() {
    //页面刷新时判断有没有用户信息 用来控制头像显示
    if (this.userInfo && this.userInfo.user.nickname != undefined) {
      this.avatar = this.userInfo.user.avatar_url;
      this.name = this.userInfo.user.nickname;
      this.hasUserInfo = true;
    }
    if (this.token) {
      this.isLogon = true;
    }
  },
  computed: {
    ...mapGetters(["userInfo", "token"]),
  },
  watch: {
    //监听用户信息的获取
    userInfo(newVal) {
      if (newVal) {
        this.hasUserInfo = true;
        this.name = newVal.user && newVal.user.nickname;
        this.avatar = newVal.user && newVal.user.avatar_url;
      } else {
        this.hasUserInfo = false;
        this.name = "登录";
        this.avatar = undefined;
      }
    },

    //监听token
    token(newToken) {
      if (newToken) {
        this.isLogon = true;
      } else {
        this.isLogon = false;
      }
    },
  },
  methods: {
    //点击登录
    toLogin() {
      if (this.isLogon && this.hasUserInfo) {
        return;
      } else {
        this.$Login("login");
      }
    },

    //点击登录
    toRegister() {
      this.$Login("registe");
    },

    //点击退出登录
    toLogOut() {
      //从vuex获取用户名
      const userName = this.$store.getters.userInfo.user.nickname;
      const alertTitle = `你好！${userName}`;
      const alertContainer = `<i style='color:red'>你确定要退出当前登陆吗？</i>`;
      this.$alert(alertContainer, alertTitle, {
        confirmButtonText: "确定",
        roundButton: true,
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        callback: (action) => {
          if (action == "confirm") {
            this.$store.dispatch("Logout").then((res) => {
              this.$router.push("/");
              if (res) {
                this.$message({
                  message: "成功退出，欢迎下次再来哦",
                  type: "success",
                });
              }
            });
          }
        },
      });
    },

    //跳去个人用户界面
    toUserInfo() {
      this.$router.push("/user");
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 300px;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .user-info {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
}
.panel {
  width: 250px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .login-title {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
  }
  .login-item {
    width: 100%;
    display: flex;
    justify-content: center;
    .login-container {
      margin: 5px;
      cursor: pointer;
      .item-icon {
        width: 25px;
        font-size: 20px;
        border-radius: 50%;
        padding: 5px;
        overflow: hidden;
      }
      .item-title {
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>