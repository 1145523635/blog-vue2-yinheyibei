<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-09-25 21:34:23
-->
<template>
  <div class='app-container'>模块开发中</div>
</template>

<script>
import { sendMessages } from "@/api/test";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      path: "ws://8.131.60.32:2348",

      /* webscockt 对象 */
      socket: null,
      input: undefined,
      userInfo: {},
      toUserId: 1,
      infoList: [],
      socketTimer: null,
    };
  },
  created() {
    // this.initWebSocket();
  },
  methods: {
    //初始化webSockt
    initWebSocket() {
      this.socket = new WebSocket(this.path);
      // CONNECTING：值为0，表示正在连接。
      // OPEN：值为1，表示连接成功，可以通信了。
      // CLOSING：值为2，表示连接正在关闭。
      // CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

      this.socket.onopen = this.socketOpen;
      this.socket.onerror = this.socketOnerror;
      this.socket.onmessage = this.socketOnmessage;
      // this.socketTimer = setInterval(() => {
      //   const data={
      //     type:'heartbeat',
      //   }
      //   this.socket.send(JSON.stringify(data));
      // }, 15000);
      // this.socket.onclose = this.socketOnclose;
    },
    /* 发送消息 */
    socketSend() {
      const data = {
        type: "text",
        toUserId: this.toUserId,
        content: this.input,
      };
      this.socket.send(JSON.stringify(data));
    },
    /* 接收消息 */
    socketOnmessage(data) {
      console.log(JSON.parse(data.data));
      this.infoList.push(JSON.parse(data.data));
    },
    /* 连接成功 */
    socketOpen() {
      console.log("websocket连接成功");
      const data = {
        userId: this.userInfo.id,
        type: "bind",
        content: "初次连接",
      };
      this.socket.send(JSON.stringify(data));
    },
    /* 连接失败 */
    socketOnerror(e) {
      console.log("连接失败", e);
    },
    /* 关闭连接 */
    socketOnclose(e) {
      console.log("关闭连接", e);
    },

    /**
     * 主动发送消息
     */
    activelySendMessages() {
      sendMessages().then((res) => {
        console.log(res);
      });
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
