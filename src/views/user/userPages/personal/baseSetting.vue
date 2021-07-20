<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-13 15:40:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-21 00:54:01
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
          <el-form-item label="昵称" prop="name">
            <el-input
              v-model="userForm.nickname"
              size="small"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="name">
            <el-input
              v-model="userForm.mailbox"
              size="small"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="name">
            <el-input
              v-model="userForm.telephone"
              size="small"
              maxlength="11"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="name">
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
          <el-form-item label="签名" prop="name">
            <el-input
              v-model="userForm.name"
              type="textarea"
              :autosize="{ minRows: 4 }"
              placeholder="写下专属于你的个性签名吧！"
              size="small"
              show-word-limit
              maxlength="50"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getBlogUserInfo } from "@/api/user/userInfo";
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
      rules: {},

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
    };
  },
  created() {
    getBlogUserInfo().then((res) => {
      this.userForm = res.data;
    });
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