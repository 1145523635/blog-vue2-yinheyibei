<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-11 12:41:24
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-11 21:37:05
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
          </div>
        </div>
        <span style="line-height: 60px" slot="reference" @click="toLogin"
          >登录</span
        >
      </el-popover>
    </div>

    <!-- 登录 or 注册 -->
    <el-dialog
      :visible.sync="dialogLogin"
      width="20%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="login-form">
        <div class="form-title">
          <div class="login">
            <span>登录</span>
          </div>
          <div class="register">
            <span>注册</span>
          </div>
        </div>
        <div class="form">
          <el-form
            :model="loginForm"
            :rules="loginRules"
            status-icon
            ref="loginForm"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item prop="name">
              <el-input
                type="text"
                placeholder="用户名 or 邮箱"
                v-model="loginForm.name"
                autocomplete="off"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
                placeholder="登录密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//引入vuex方法
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      //控制登录弹出框
      dialogLogin: false,

      //判断是注册还是登录
      isLogin: true,

      //登录表单
      loginForm: {
        name: "",
        password: "",
      },

      //登录表单验证规则
      loginRules: {
        name: [
          { required: true, message: "请输入用户名 or 邮箱", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    //将 `this.Login()` 映射为 `this.$store.dispatch('Login')`
    ...mapActions(["Login"]),
    //点击登录
    toLogin() {
      this.dialogLogin = true;
    },

    //登录
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const { name, password } = this.loginForm;
          const data = { account: name, password: this.$utils.md5(password) };
          this.Login(data).then((res) => {
            if (res) {
              this.dialogLogin = false;
              this.$router.push({ path: "/" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //弹出框关闭
    handleClose() {
      this.dialogLogin = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 200px;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
.login-form {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .form-title {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    .register::before {
      content: "";
      width: 4px;
      height: 4px;
      margin: 0 0.5em;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      background: #2997f7;
      opacity: 0.3;
      vertical-align: 0.2em;
    }
  }
  .form {
    width: 100%;
    .login-btn {
      width: 100%;
    }
  }
}
</style>