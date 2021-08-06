<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-06 15:26:13
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
      float
    />
  </div>
</template>
<script>
console.log(process.env.NODE_ENV);
export default {
  name: "App",
  data() {
    return {
      audio: [
        {
          name: "七里香",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/index.flac",
          theme: this.randomColor(),
        },
        {
          name: "她的睫毛",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/她的睫毛.flac",
          theme: this.randomColor(),
        },
        {
          name: "晴天",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/晴天.flac",
          theme: this.randomColor(),
        },
        {
          name: "以父之名",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/以父之名.flac",
          theme: this.randomColor(),
        },
        {
          name: "本草纲目",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/本草纲目.flac",
          theme: this.randomColor(),
        },
        {
          name: "菊花台",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/菊花台.flac",
          theme: this.randomColor(),
        },
        {
          name: "断了的弦",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/断了的弦.flac",
          theme: this.randomColor(),
        },
        {
          name: "彩虹",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/彩虹.flac",
          theme: this.randomColor(),
        },
        {
          name: "听妈妈的话",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/听妈妈的话.flac",
          theme: this.randomColor(),
        },
        {
          name: "千里之外",
          artist: "jay、费玉清",
          url: "https://ljk.ganfanwang.cn/static/music/千里之外.flac",
          theme: this.randomColor(),
        },
        {
          name: "甜甜的",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/甜甜的.flac",
          theme: this.randomColor(),
        },
        {
          name: "兰亭序",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/兰亭序.flac",
          theme: this.randomColor(),
        },
        {
          name: "青花瓷",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/青花瓷.flac",
          theme: this.randomColor(),
        },
        {
          name: "说好的幸福呢",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/说好的幸福呢.flac",
          theme: this.randomColor(),
        },
        {
          name: "霍元甲",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/霍元甲.flac",
          theme: this.randomColor(),
        },
        {
          name: "花海",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/花海.flac",
          theme: this.randomColor(),
        },
        {
          name: "给我一首歌的时间",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/给我一首歌的时间.flac",
          theme: this.randomColor(),
        },
        {
          name: "稻香",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/稻香.flac",
          theme: this.randomColor(),
        },
        {
          name: "红尘客栈",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/红尘客栈.flac",
          theme: this.randomColor(),
        },
        {
          name: "乌克丽丽",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/乌克丽丽.flac",
          theme: this.randomColor(),
        },
        {
          name: "明明就",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/明明就.flac",
          theme: this.randomColor(),
        },
        {
          name: "退后",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/退后.flac",
          theme: this.randomColor(),
        },
        {
          name: "东风破",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/music/indexs.flac",
          theme: this.randomColor(),
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
    randomColor() {
      return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
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
