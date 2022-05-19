<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-13 15:40:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-05-16 11:19:02
-->
<template>
  <div class="app-container">
    <div class="container">
      <div class="password-form">
        <h5 class="form-title">修改密码</h5>
        <el-form
          :model="passwordForm"
          :rules="rules"
          ref="passwordForm"
          label-width="100px"
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="passwordForm.oldPassword"
              size="small"
              maxlength="10"
              show-word-limit
              type="password"
              placeholder="请输入你的原密码 ！"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="passwordForm.newPassword"
              size="small"
              maxlength="10"
              show-word-limit
              type="password"
              placeholder="请输入你的新密码 ！"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="againPassword">
            <el-input
              v-model="passwordForm.againPassword"
              size="small"
              maxlength="10"
              show-word-limit
              type="password"
              placeholder="请确认你的新密码 ！"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="saveData"
              :loading="btnLoading"
              style="width:200px"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { updateBlogUserPassword } from "@/api/user/userInfo";
export default {
  name: "SecuritySetting",
  data() {
    /* 验证两次密码是否一致 */
    const validateAgainPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //表单数据
      passwordForm: {
        oldPassword: "", //原密码
        newPassword: "", //新密码
        againPassword: "", //再次确认密码
      },

      //验证规则
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "密码长度在6到12之间哦~",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "密码长度在6到12之间哦~",
            trigger: "blur",
          },
        ],
        againPassword: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateAgainPassword, trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "密码长度在6到12之间哦~",
            trigger: "blur",
          },
        ],
      },

      //按钮loading动画
      btnLoading: false,
    };
  },

  methods: {
    saveData() {
      this.btnLoading = true;
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.passwordForm);
          //遍历对象属性，对每个密码进行md5加密
          for (let key in data) {
            data[key] = this.$utils.md5(data[key]);
          }
          updateBlogUserPassword(data).then((res) => {
            if (res.code == 200) {
              this.$notify({
                title: "修改成功！",
                message: `你的密码已经修改成功咯！`,
                type: "success",
              });
            }
            this.$refs.passwordForm.resetFields();
            this.btnLoading = false;
          });
        } else {
          console.log("error submit!!");
          this.btnLoading = false;
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.app-container {
  width: 100%;
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    .password-form {
      min-width: 700px;
      margin: 20px;
      .form-title {
        text-align: left;
        margin-bottom: 20px;
      }
    }
  }
}
</style>