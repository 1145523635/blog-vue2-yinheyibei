<!--
 * @Descripttion: 个人资料
 * @Author: 银河以北
 * @Date: 2021-10-25 22:04:52
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-25 22:39:24
-->
<template>
  <div class="app-container">
    <div class='container'>
      <div class='user-info'>
        <p>
          <span class='user-label'>昵称</span> <span
            class='user-value'
            v-if='visitorInfo.user.nickname'
          >{{visitorInfo.user.nickname}}</span><span
            class='user-value'
            v-else
          >未知</span>
        </p>
        <p>
          <span class='user-label'>性别</span> <span
            class='user-value'
            v-if='visitorInfo.user.gender'
          ><span v-if='visitorInfo.user.gender==1'>男</span><span v-else>女</span></span><span
            class='user-value'
            v-else
          >未知</span>
        </p>
        <p>
          <span class='user-label'>邮箱</span> <span
            class='user-value'
            v-if='visitorInfo.user.mailbox'
          >{{visitorInfo.user.mailbox}}</span><span
            class='user-value'
            v-else
          >未知</span>
        </p>
        <p>
          <span class='user-label'>注册时间</span> <span
            class='user-value'
            v-if='visitorInfo.user.create_time'
          >{{visitorInfo.user.create_time}}</span><span
            class='user-value'
            v-else
          >未知</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalData",
  data() {
    return {
      //访客信息
      visitorInfo: {
        user: {},
        other: {},
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.visitorInfo = Object.assign({}, this.$store.getters.visitorInfo);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  .container {
    width: calc(100% - 40px);
    padding: 20px;
    display: flex;
    justify-content: center;
    .user-info {
      width: 400px;
      text-align: left;
      p {
        margin-bottom: 30px;
      }
      .user-label {
        color: rgb(177, 177, 177);
        font-size: 14px;
        margin-right: 20px;
        width: 70px;
        text-align: right;
        display: inline-block;
      }
      .user-value {
        color: #4e5358;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        display: inline-block;
      }
    }
  }
}
</style>
