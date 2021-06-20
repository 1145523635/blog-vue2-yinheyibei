<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-11 12:41:24
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-20 22:49:17
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
        <div class="panel" slot="">
          <div class="login-title">
            <h6>登录方式</h6>
          </div>
          <div class="login-item">
            <div class="login-container" @click="toLogin">
              <div class="item-icon" style="background: #e9f4fe">
                <i class="el-icon-user" style="color: #2997f7"></i>
              </div>
              <div class="item-title" style="color: #2997f7">
                <span>登录</span>
              </div>
            </div>
            <div class="login-container">
              <div class="item-icon" style="background: #eefaf0">
                <i class="el-icon-plus" style="color: #18a52a"></i>
              </div>
              <div class="item-title" style="color: #18a52a">
                <span>注册</span>
              </div>
            </div>
            <div class="login-container" @click="toLogOut">
              <div class="item-icon" style="background: #fef0f0">
                <i class="el-icon-right" style="color: #f56c6c"></i>
              </div>
              <div class="item-title" style="color: #f56c6c">
                <span>退出</span>
              </div>
            </div>
          </div>
        </div>
        <div slot="reference" style="height: 60px" @click="toLogin">
          <!-- 登录信息 -->
          <span style="line-height: 60px" v-if="!isLogon && !hasUserInfo"
            >登录
          </span>
          <!-- 获取用户信息 缓存登录图标 -->
          <i
            v-else-if="isLogon && !hasUserInfo"
            style="color: #00a2e3; line-height: 60px"
            class="el-icon-loading"
          ></i>
          <!-- 展示登录信息 -->
          <div v-else-if="isLogon && hasUserInfo" class="user-info">
            <div style="margin-right: 10px">
              <el-avatar
                size="medium"
                :src="$utils.imgUrl(hasUserInfo.user.avatar_url)"
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
    };
  },
  created() {
    console.log(this.$store.state);
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
      this.hasUserInfo = true;
      this.name = newVal.user && ewVal.user.nickname;
    },
    token(newToken) {
      if (newToken) {
        this.isLogon = true;
      }
    },
  },
  methods: {
    //点击登录
    toLogin() {
      this.$Login();
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
        callback: () => {
          this.$store.dispatch("Logout").then((res) => {
            this.$router.push("/");
            if (res) {
              this.$message({
                message: "成功退出，欢迎下次再来哦",
                type: "success",
              });
            }
          });
        },
      });
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
        font-size: 20px;
        border-radius: 50%;
        padding: 5px;
        overflow: hidden;
      }
      .item-title {
        font-size: 12px;
      }
    }
  }
}
</style>