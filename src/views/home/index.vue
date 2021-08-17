<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-17 00:43:42
-->
<template>
  <div class="home">
    <h1>websocket测试</h1>
    <el-input v-model="input"></el-input>
    <el-button type="primary" @click="socketSend">发送信息</el-button>
   <el-skeleton :rows="6" animated />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      path: "ws://0.0.0.0:2346?a=13",
      socket: {},
      input: undefined,
    };
  },
  created() {
    // this.init();
  },
  methods: {
    init() {
      // 实例化socket
      this.socket = new WebSocket(this.path);
      console.log(this.socket);

      // 监听socket消息
      this.socket.onmessage = this.getMessage;
    },
    socketSend() {
      this.socket.send(this.input);
    },
    open() {
      console.log("websockt连接成功");
    },
    error() {
      console.log("websockt连接失败");
    },
    getMessage({ data }) {
      console.log(data);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  text-align: center;
  background: #fff;
}
</style>
