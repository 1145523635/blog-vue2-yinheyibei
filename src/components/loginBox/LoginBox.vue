<!--
 * @Descripttion: 全局登录and注册组件
 * @Author: 银河以北
 * @Date: 2021-06-15 14:19:12
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-09-15 13:32:44
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
      <div
        class="dialogTitle"
        :class="{
          'login-title-container': showLoginFrom,
          'register-title-container': !showLoginFrom,
        }"
      >
        <span
          :class="{ 'login-title': showLoginFrom }"
          @click="changeTable('login')"
          >登录</span
        >
        and
        <span
          :class="{ 'register-form': !showLoginFrom }"
          @click="changeTable('register')"
          >注册</span
        >
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
      <div class="form" v-show="showLoginFrom">
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
              @keyup.enter.native="login"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              class="login-btn"
              :loading="loginLoading"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 注册表单 -->
      <div class="register-form" v-show="!showLoginFrom">
        <el-form
          :model="registerForm"
          :rules="registerRules"
          status-icon
          ref="registerForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="nickname">
            <el-input
              type="text"
              placeholder="请输入用户名"
              v-model="registerForm.nickname"
              autocomplete="off"
              clearable
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              type="text"
              placeholder="请输入邮箱"
              v-model="registerForm.email"
              autocomplete="off"
              clearable
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              size="small"
              placeholder="请输入验证码"
              v-model="registerForm.code"
               clearable
            >
              <template slot="append"
                ><el-button
                  :loading="getCodeLoading"
                  style="cursor: pointer"
                  @click="getCode"
                >
                  <span v-if="!getCodeLoading">获取验证码</span>
                  <span v-else>获取中...</span>
                </el-button></template
              >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="registerForm.password"
              autocomplete="off"
              clearable
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item prop="againPassword">
            <el-input
              type="password"
              placeholder="请确认密码"
              v-model="registerForm.againPassword"
              autocomplete="off"
              clearable
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              size="small"
              class="login-btn"
              :loading="registerLoading"
              @click="registerUser"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getRegisterCode, userRegister } from "@/api/login/index";

//引入vuex
import store from "@/store";

//引入路由
import router from "@/router";
export default {
  data() {
    /* 验证两次密码是否一致 */
    const validateAgainPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      //登录表单
      loginForm: {
        // 1145523635@qq.com
        email: "",
        password: "",
      },

      //登录按钮loading状态
      loginLoading: false,

      //注册按钮loading状态
      registerLoading: false,

      //获取邮箱验证码状态
      getCodeLoading: false,

      //登录表单验证规则
      loginRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
              /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
            message: "请正确输入邮箱格式",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度在6到12位哦~", trigger: "blur" },
        ],
      },

      //登录表单控制显示
      showLoginFrom: true,

      //注册表单
      registerForm: {
        // 3627629185@qq.com
        email: "",
        code: undefined,
        password: undefined,
        againPassword: undefined,
        nickname: undefined,
      },

      //注册表单验证规则
      registerRules: {
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "用户名长度在3到12之间哦~",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
              /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
            message: "请正确输入邮箱格式",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码长度为6哦~", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度在6到12位哦~", trigger: "blur" },
        ],
        againPassword: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { validator: validateAgainPassword, trigger: "blur" },
          { min: 6, max: 12, message: "密码长度在6到12位哦~", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    async login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginLoading = true;
          const { email, password } = this.loginForm;
          const data = { email, password: this.$utils.md5(password) };
          store.dispatch("Login", data).then((res) => {
            if (!res) {
              this.loginLoading = false;
              return;
            }
            //判断有没有用户信息
            if (!store.state.user.info) {
              //获取用户信息
              store.dispatch("GetInfo");
            }
            setTimeout(() => {
              this.$notify({
                title: "登录成功！",
                message: `欢迎回来，${store.state.user.info.user.nickname}`,
                type: "success",
              });
              this.show = false;
              // router.push("/");
              router.go(0)
              this.loginLoading = false;
            }, 1000);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //切换表单
    changeTable(fromName) {
      if (fromName === "login") {
        this.showLoginFrom = true;
      } else {
        this.showLoginFrom = false;
      }
    },

    //获取二维码
    async getCode() {
      //只验证一个字段 email 有没有
      this.$refs.registerForm.validateField("nickname", (havaName) => {
        if (!havaName) {
          this.$refs.registerForm.validateField("email", (validate) => {
            this.getCodeLoading = true;
            if (!validate) {
              const data = {
                email: this.registerForm.email,
                nickname: this.registerForm.nickname,
              };
              getRegisterCode(data).then((res) => {
                this.getCodeLoading = false;
                if (res.data == "true") {
                  this.$notify({
                    title: "邮件发送成功",
                    message: "请在邮箱内查看验证码，验证码有效时间为10分钟！",
                    type: "success",
                  });
                }
              });
            }
          });
        }
      });
    },

    //用户注册
    registerUser() {
      this.$refs.registerForm.validate((validate) => {
        if (validate) {
          this.registerLoading = true;
          const data = Object.assign({}, this.registerForm);
          //密码md5加密
          data.password = this.$utils.md5(data.password);
          data.againPassword = this.$utils.md5(data.againPassword);
          userRegister(data).then((res) => {
            this.registerLoading = false;
            if (res.code == 200) {
              this.showLoginFrom = true;
              this.$notify({
                title: "注册成功！",
                message: "你以成功进行注册，现在可以进行登录啦！",
                type: "success",
              });
            }
          });
        }
      });
    },
  },

  watch: {
    showLoginFrom() {
      if (this.$refs.registerForm) {
        this.$refs.registerForm.resetFields();
      }
      if (this.$refs.loginForm) {
        this.$refs.loginForm.resetFields();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dialogTitle {
  padding-left: 20px;
  span {
    cursor: pointer;
  }
  .login-title {
    color: #2997f7;
    font-weight: 600;
  }
  .register-form {
    color: #85ce61;
    font-weight: 600;
  }
}
.login-title-container {
  border-bottom: 2px solid #00a2e3;
}
.register-title-container {
  border-bottom: 2px solid #85ce61;
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

