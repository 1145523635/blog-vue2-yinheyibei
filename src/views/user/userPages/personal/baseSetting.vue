<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-13 15:40:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-21 17:39:12
-->
<template>
  <div class="app-container">
    <div class="container">
      <div class="user-form">
        <el-form
          :model="userForm"
          :rules="rules"
          ref="userForm"
          label-width="100px"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="userForm.nickname"
              size="small"
              maxlength="10"
              show-word-limit
              placeholder="请输入你的昵称 ！"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mailbox">
            <el-input
              v-model="userForm.mailbox"
              size="small"
              maxlength="30"
              placeholder="请输入你的邮箱！"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="telephone">
            <el-input
              v-model="userForm.telephone"
              size="small"
              maxlength="11"
              show-word-limit
              placeholder="请输入你的联系电话！"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              v-model="userForm.gender"
              placeholder="请选择性别"
              size="small"
              style="width: 100%"
            >
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 100%"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="签名">
            <el-input
              v-model="userForm.autograph"
              type="textarea"
              :autosize="{ minRows: 4 }"
              placeholder="写下专属于你的个性签名吧！"
              size="small"
              show-word-limit
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="saveData"
              :loading="btnLoading"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getBlogUserInfo, updateBlogUserInfo } from "@/api/user/userInfo";
export default {
  name: "BaseSetting",
  data() {
    return {
      //表单数据
      userForm: {
        nickname: "", //昵称
        telephone: "", //电话
        mailbox: "", //邮箱
        gender: 1, //性别
        autograph: "", //签名
      },

      //验证规则
      rules: {
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "用户名长度在1到12之间哦~",
            trigger: "blur",
          },
        ],
        mailbox: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
              /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
            message: "请正确输入邮箱格式",
            trigger: "blur",
          },
        ],
        telephone: [
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: "请正确输入手机格式",
            trigger: "blur",
          },
        ],
      },

      //性别下来框
      genderOptions: [
        {
          value: 0,
          label: "女",
        },
        {
          value: 1,
          label: "男",
        },
      ],

      //按钮loading
      btnLoading: false,
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      getBlogUserInfo().then((res) => {
        this.userForm = res.data;
      });
    },
    /* 保存数据 */
    saveData() {
      this.btnLoading = true;
      this.$refs.userForm.validate((validate) => {
        if (validate) {
          //浅克隆数据
          const data = Object.assign({}, this.userForm);
          updateBlogUserInfo(data).then((res) => {
            if (res.code == 200) {
              this.init();
              this.btnLoading = false;
              this.$notify({
                title: "修改成功！",
                message: `你的信息已经修改成功咯！`,
                type: "success",
              });
            }
          });
        } else {
          this.btnLoading = false;
          return fasle;
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

    .user-form {
      min-width: 700px;
      margin: 20px;
    }
  }
}
</style>