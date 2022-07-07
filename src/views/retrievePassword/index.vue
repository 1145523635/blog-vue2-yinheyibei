<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2022-04-10 23:11:10
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-07-07 11:38:34
-->
<template>
  <div class="app-container">
    <div class="container">
      <h3 style="padding-top:20px"> <span
          class="recommend-title"
          v-if=!isOk
        >找回密码 </span></h3>
      <div
        class="from-container"
        v-if=!isOk
      >
        <el-form
          :model="retrievePasswordForm"
          :rules="retrievePasswordRules"
          status-icon
          ref="retrievePasswordForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="email">
            <el-input
              type="text"
              placeholder="请输入邮箱"
              v-model="retrievePasswordForm.email"
              autocomplete="off"
              clearable
              size="small "
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              size="small"
              placeholder="请输入验证码"
              v-model="retrievePasswordForm.code"
              clearable
              show-word-limit
              maxlength="6"
            >
              <template slot="append">
                <el-button
                  :loading="getCodeLoading"
                  style="cursor: pointer"
                  @click="getCode"
                >
                  <span v-if="!getCodeLoading">获取验证码</span>
                  <span v-else>获取中...</span>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入新密码"
              v-model="retrievePasswordForm.password"
              autocomplete="off"
              clearable
              size="small"
              show-word-limit
              maxlength="12"
            ></el-input>
          </el-form-item>
          <el-form-item prop="againPassword">
            <el-input
              type="password"
              placeholder="请确认新密码"
              v-model="retrievePasswordForm.againPassword"
              autocomplete="off"
              clearable
              size="small "
              show-word-limit
              maxlength="12"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              class="login-btn"
              :loading="retrievePasswordLoading"
              @click="retrievePassword"
              style="width:100%"
            >确定</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div
        class="tips"
        v-if=!isOk
      >
        <div> 银河以北个人博客采用邮箱注册登录方式，如若您丢失密码，且不记得注册邮箱，请联系作者提供自己的相关信息，如用户名、电话、发布的文章、资源等信息，作者在后台帮你重置密码！本博客在设计之初就承诺不会强迫用户提供较多的个人信息，烦请谅解！</div>
      </div>

      <div v-if=isOk>
        <el-result
          icon="success"
          title="密码重置成功！"
          subTitle="您的密码已重置成功，快去登录吧！"
        >
        </el-result>
      </div>

    </div>

  </div>
</template>

<script>
import { retrievePasswordCode, userRetrievePassword } from "@/api/login/index";
export default {
  name: "RetrievePassword",
  data() {
    /* 验证两次密码是否一致 */
    const validateAgainPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.retrievePasswordForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 判断是否在获取验证码
      getCodeLoading: false,

      // 找回密码loding
      retrievePasswordLoading: false,

      // 判断是否成功找回密码
      isOk: false,

      //找回密码表单
      retrievePasswordForm: {
        email: "",
        code: undefined,
        password: undefined,
        againPassword: undefined,
      },

      //找回密码表单验证规则
      retrievePasswordRules: {
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
          { required: true, message: "请输入新登录密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度在6到12位哦~", trigger: "blur" },
        ],
        againPassword: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateAgainPassword, trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在6到12之间哦~",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 获取验证码
    getCode() {
      this.$refs.retrievePasswordForm.validateField("email", (validate) => {
        this.getCodeLoading = true;
        if (!validate) {
          const data = {
            email: this.retrievePasswordForm.email,
          };
          retrievePasswordCode(data).then((res) => {
            if (res.data == "true") {
              this.$notify({
                title: "邮件发送成功",
                message: "请在邮箱内查看验证码，验证码有效时间为10分钟！",
                type: "success",
              });
            }
            this.getCodeLoading = false;
          });
        } else {
          this.getCodeLoading = false;
        }
      });
    },

    // 找回密码
    retrievePassword() {
      this.$refs.retrievePasswordForm.validate((validate) => {
        this.retrievePasswordLoading = true;
        if (validate) {
          this.registerLoading = true;
          const data = Object.assign({}, this.retrievePasswordForm);
          //密码md5加密
          data.password = this.$utils.md5(data.password);
          data.againPassword = this.$utils.md5(data.againPassword);
          userRetrievePassword(data).then((res) => {
            if (res.code == 200) {
              this.retrievePasswordLoading = false;
              this.isOk = true;
              this.$notify({
                title: "密码重置成功",
                message: "你以成功重置密码，现在可以进行登录啦！",
                type: "success",
              });
            }
          });
        } else {
          this.retrievePasswordLoading = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/style/commonStyle.less";
.app-container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;

  .container {
    width: 100%;
    background: #fff;
    .title-color-scroll-style();

    .from-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    .tips {
      width: 100%;
      font-size: 12px;
      color: #b1b1b1;
      display: flex;
      justify-content: center;
      div {
        width: 75%;
        margin-bottom: 20px;
      }
    }
  }
}
</style>