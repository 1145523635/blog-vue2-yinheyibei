<!--
 * @Descripttion: 全局登录or注册组件
 * @Author: 银河以北
 * @Date: 2021-06-15 14:19:12
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-06 22:41:09
-->
<template>
  <el-dialog
    :visible.sync="show"
    :append-to-body="true"
    :show-close="true"
    width="300px"
    :close-on-click-modal="false"
  >
    <div slot="title">
      <div class="dialogTitle">
        <span :class="{ 'login-title': showLoginFrom }">登录</span> or
        <span :class="{ 'register-form': !showLoginFrom }">注册</span>
      </div>
    </div>
    <div class="login-form">
      <div class="form-title">
        <div class="login" @click="changeTable('login')">
          <span :class="{ 'login-form': showLoginFrom }">登录</span>
        </div>
        <div class="register" @click="changeTable('register')">
          <span :class="{ 'register-form ': !showLoginFrom }">注册</span>
        </div>
      </div>
      <div class="form" v-if="showLoginFrom">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          status-icon
          ref="loginForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="email">
            <el-input
              type="email"
              placeholder="请输入邮箱"
              v-model="loginForm.email"
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
      <div class="register-form" v-else>
        <el-form
          :model="registerForm"
          :rules="registerRules"
          status-icon
          ref="loginForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="email">
            <el-input
              type="text"
              placeholder="请输入邮箱"
              v-model="registerForm.name"
              autocomplete="off"
              clearable
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              size="small"
              placeholder="请输入验证码"
              v-model="registerForm.code"
            >
              <template slot="append"
                ><div style="cursor: pointer" @click="getCode">
                  获取验证码
                </div></template
              >
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="registerForm.possword"
              autocomplete="off"
              clearable
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              type="password"
              placeholder="请确认密码"
              v-model="registerForm.againPossword"
              autocomplete="off"
              clearable
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" class="login-btn"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getRegisterCode } from "@/api/login/index";

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
        email: "1145523635@qq.com",
        password: "123456",
      },

      //登录表单验证规则
      loginRules: {
        email: [
          { required: true, message: "请输入用户名 or 邮箱", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },

      //登录表单控制显示
      showLoginFrom: true,

      //注册表单
      registerForm: {
        email: undefined,
        code: undefined,
        password: undefined,
        againPassword: undefined,
      },

      //注册表单验证规则
      registerRules: {},
    };
  },

  methods: {
    async login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const { email, password } = this.loginForm;
          const data = { email, password: this.$utils.md5(password) };
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

    //切换表单
    changeTable(fromName) {
      console.log(fromName);
      if (fromName === "login") {
        this.showLoginFrom = true;
      } else {
        this.showLoginFrom = false;
      }
    },

    //获取二维码
    getCode() {
      const data = Object.assign({}, this.registerForm);
      getRegisterCode(data).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dialogTitle {
  padding-left: 20px;
  border-bottom: 2px solid #00a2e3;
  .login-title {
    color: #2997f7;
    font-weight: 600;
  }
  .register-form {
    color: #85ce61;
    font-weight: 600;
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
    .login {
      cursor: pointer;
    }
    .register {
      cursor: pointer;
    }
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
  .register-form {
    width: 100%;
    .login-btn {
      width: 100%;
    }
  }
  .login-form {
    color: #2997f7;
    font-weight: 600;
  }
  .register-form {
    color: #85ce61;
    font-weight: 600;
  }
}
</style>

