<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-30 21:00:34
-->
<template>
  <div class="home">
    <VueAplayer
      :audio="'audio'"
      :lrcType="3"
      :music="musicList[0]"
      :showlrc="true"
      :narrow="false"
      theme="#19ABE6"
      mode="circulation"
      :float="true"
      listmaxheight="96px"
      ref="player"

      :list="musicList"
      :autoplay="true"
    />
  </div>
</template>

<script>
import VueAplayer from "vue-aplayer";
export default {
  name: "Home",
  components: {
    VueAplayer,
  },
  data() {
    return {
      musicList: [
        {
          title: "七里香",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/index.flac",
          // pic: "封面图片URL",
          // lrc: "歌词或歌词文件的URL",
        },
        {
          title: "东风破",
          artist: "jay",
          url: "https://ljk.ganfanwang.cn/static/indexs.flac",
          // pic: "封面图片URL",
          // lrc: "歌词或歌词文件的URL",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.home {
  height: 500px;
}
</style>
