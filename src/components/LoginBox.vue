<!--
 * @Descripttion: 全局登录or注册组件
 * @Author: 银河以北
 * @Date: 2021-06-15 14:19:12
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-01 15:20:40
-->
<template>
  <el-dialog
    :visible.sync="show"
    :append-to-body="true"
    :show-close="true"
    width="300px"
    :close-on-click-modal="false"
  >
    <div slot="title" class="d-flex justify-content-between height50">
      <div class="dialogTitle">登录or注册</div>
    </div>
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
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
              placeholder="登录密码"
              show-password
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              class="login-btn"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
//引入vuex
import store from "@/store";

//引入路由
import router from "@/router";
export default {
  data() {
    return {
      show: false,

      //登录表单
      loginForm: {
        name: "yinheyibei",
        password: "123456",
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

  methods: {
    async login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const { name, password } = this.loginForm;
          const data = { account: name, password: this.$utils.md5(password) };
          store.dispatch("Login", data).then((res) => {
            //判断有没有用户信息
            if (!store.state.user.info) {
              //获取用户信息
              store.dispatch("GetInfo");
            }
            if (res) {
              this.show = false;
              router.push("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dialogTitle {
  border-bottom: 2px solid #00a2e3;
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

