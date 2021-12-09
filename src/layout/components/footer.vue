<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 22:22:12
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-12-09 15:16:35
-->
<template>
  <div class="app-container">
    <div class="container">
      <el-row :gutter="50">
        <!-- 博客介绍部分 -->
        <el-col :span="7" :xs="24" :sm="24" :md="7">
          <div class="introduce">
            <div class="logo">
              <img :src="logo" alt="银河以北~logo" class="logo-img" />
            </div>
            <div class="logo-title" @click="toHme">
              <h2>银河以北</h2>
            </div>
            <div>
              <p>
                一个分享个人所见、所得及所闻的有趣博客，专注于分享各种技术资源，编程技巧，美化代码，电影音乐，热点新闻等。既不是大神，也不NB，只是在生活不断折腾中找到乐趣。
              </p>
            </div>
          </div>
        </el-col>
        <!-- 版权 -->
        <el-col :span="10" :xs="24" :sm="24" :md="10">
          <div class="blog-link">
            <div>
              <div class="copyright">
                <p>
                  Copyright © 2021 银河以北. All Right Reserved. ·
                  滇ICP备2021002872号
                </p>
              </div>
              <div class="icon-container">
                <svg-icon icon-class="QQ" class="svg-icon" @click="toQQ" />
                <el-popover placement="top" width="100" trigger="hover">
                  <img :src="author" width="100%" alt="" />
                  <svg-icon icon-class="WeChat" class="svg-icon" slot="reference" />
                </el-popover>
                <el-popover placement="top" width="100" trigger="hover">
                  <img :src="officialAccount" width="100%" alt="" />
                  <svg-icon icon-class="officialAccount" class="svg-icon" slot="reference" />
                </el-popover>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 技术支持 -->
        <el-col :span="7" :xs="24" :sm="24" :md="7">
          <div class="technical-support">
            <h3>技术支持</h3>
            <p>
              <el-tag effect="dark" type="success" size="mini" class="item">vue2</el-tag>
              <el-tag effect="dark" type="info" size="mini" class="item">thinkphp6</el-tag>
              <el-tag effect="dark" type="warning" size="mini" class="item">mysql</el-tag>
              <el-tag effect="dark" type="" size="mini" class="item">element-ui</el-tag>
              <el-tag effect="dark" type="danger" size="mini" class="item">redis</el-tag>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import defaultSettings from "@/config/blogSetting";
  export default {
    name: "Footer",
    data() {
      return {
        //引入logo图片
        logo: require("@/assets/logo.png"),

        //作者微信
        author: require("@/assets/author/WeChat.png"),

        //公众号
        officialAccount: require("@/assets/author/officialAccount.png"),
      };
    },
    methods: {
      //回到首页
      toHme() {
        this.$router.push("/");
      },

      //打开QQ
      toQQ() {
        window.open(
          `http://wpa.qq.com/msgrd?v=3&uin=${defaultSettings.QQ}&site=qq`
        );
      },
    },
  };
</script>
<style lang="scss" scoped>
  .app-container {
    width: 100%;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
      padding: 10px;
      width: 1360px;
      min-height: 150px;
      background: #22292d;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #f2f2f2;
      font-size: 12px;
      text-align: left;

      .introduce {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;

        .logo {
          margin-right: 20px;

          img {
            width: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 10px;
          }
        }

        .logo-title {
          cursor: pointer;
          background-image: -webkit-linear-gradient(left, #5eaff8, #87c2f8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .blog-link {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;

        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;

          .svg-icon {
            width: 30px;
            height: 30px;
            margin: 5px;
            cursor: pointer;
          }
        }

        .copyright {
          margin-bottom: 5px;
        }
      }

      .technical-support {
        text-align: center;

        h3 {
          margin-bottom: 10px;
        }

        .item {
          margin: 5px;
        }
      }
    }
  }
</style>