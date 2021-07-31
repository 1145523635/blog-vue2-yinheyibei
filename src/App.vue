<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-31 20:38:23
-->
<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
    <!-- 音乐播放器 -->
    <aplayer
      :audio="audio"
      @update:volume="onListHide"
      :autoplay="true"
      :lrcType="3"
      fixed
    />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      audio: [
        {
          name: "七里香",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/index.flac",
        },
        {
          name: "东风破",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/indexs.flac",
          // cover: 'https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300', // prettier-ignore
          // lrc: "https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc",
        },
      ],
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods: {
    onListHide() {
      console.log("xx");
    },
  },
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(245, 246, 247);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
