<!--
 * @Descripttion: 用户信息页面
 * @Author: 银河以北
 * @Date: 2021-07-01 16:34:02
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-06-30 20:24:17
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 正上方用户背景图 -->
      <div
        class="user-cover"
        ref="vantaRef"
      >
        <!-- 用户基本信息 -->
        <div class="user-info">
          <div class="user-info-container">
            <!-- 用户头像 -->
            <div class="user-avatar">
              <img
                class="user-avatar-img"
                :src="$utils.imgUrl(userInfos.avatar_url)"
                alt=""
              />
            </div>
            <!-- 用户姓名 -->
            <div class="user-name">
              <h2>{{ userInfos.nickname }}</h2>
              <p style="font-size:14px">文章<span>{{other.articleNum.value}}</span> | 资源 <span>{{other.material.value}}</span></p>
              <p style="font-size:12px"><span v-if='userInfos.autograph'>{{userInfos.autograph}}</span><span v-else>这个人很懒，什么都没有留下！</span></p>
            </div>
          </div>

          <!-- 发表文章按钮 -->
          <div class="btn">
            <div v-if="isSelf">
              <el-tooltip
                effect="dark"
                content="写文章"
                placement="top-start"
              >
                <el-button
                  type="primary"
                  icon="el-icon-document"
                  size="mini"
                  @click="toWriteArticle"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="推荐资源"
                placement="top-start"
              >
                <el-button
                  type="warning"
                  icon="el-icon-postcard"
                  size="mini"
                  @click="toRecommendedResources"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>

      <!-- 菜单导航 -->
      <div class="menu-link">
        <div class="link-item">
          <div class="item">
            <router-link
              tag="div"
              :to="{ path: '/userInfo/'+userId+'/releaseList' }"
            ><span style="margin-right: 5px"><i class="el-icon-document-checked"></i></span>
              发布</router-link>
          </div>
          <div
            class="item"
            v-if='isSelf'
          >
            <router-link
              tag="div"
              :to="{ path: '/userInfo/'+userId+'/collection' }"
            ><span style="margin-right: 5px"><i class="el-icon-star-off"></i></span>收藏</router-link>
          </div>
          <div class="item">
            <router-link
              tag="div"
              :to="{ path: '/userInfo/'+userId+'/material' }"
            ><span style="margin-right: 5px">
                <i class="el-icon-postcard"></i></span>
              资源</router-link>
          </div>
          <div
            class="item"
            v-if='isSelf'
          >
            <router-link
              tag="div"
              :to="{ path:'/userInfo/'+userId+'/follow' }"
            ><span style="margin-right: 5px">
                <i class="el-icon-view"></i></span>关注</router-link>
          </div>
          <div
            class="item"
            v-if='isSelf'
          >
            <router-link
              tag="div"
              :to="{ path: '/userInfo/'+userId+'/articleNews' }"
            ><span style="margin-right: 5px">
                <i class="el-icon-news"></i></span>消息</router-link>
          </div>
          <div
            class="item"
            v-if='isSelf'
          >
            <router-link
              tag="div"
              id="personal"
              :to="{ path: '/userInfo/'+userId+'/personal'  }"
            ><span style="margin-right: 5px">
                <i class="el-icon-user"></i></span>用户</router-link>
          </div>
          <div
            class="item"
            v-if='!isSelf'
          >
            <router-link
              tag="div"
              id="personal"
              :to="{ path: '/userInfo/'+userId+'/personalData'  }"
            ><span style="margin-right: 5px">
                <i class="el-icon-user"></i></span>个人资料</router-link>
          </div>
        </div>
      </div>
      <!-- 子级路由展示 -->
      <div class="router-view">
        <transition
          name="el-zoom-in-center"
          mode="out-in"
        >
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import BIRDS from "vanta/src/vanta.birds";
import CLOUDS from "vanta/src/vanta.clouds";
import { mapGetters } from "vuex";
import { getVisitorInfo } from "@/api/login/index";
export default {
  name: "UserInfo",
  data() {
    return {
      //背景图片
      userCover: require("@/assets/user/user-cover.png"),

      //用户信息
      userInfos: {},

      //用户其他信息
      other: {
        articleNum: {},
        material: {},
      },

      //访客ID
      userId: undefined,

      //判断是不是用户自己
      isSelf: false,

      // vanta 变量
      vantaEffect: null,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
    });
  },
  methods: {
    //初始化信息 加载访客信息
    init() {
      this.userId = this.$route.params.userId;

      if (this.userId != this.$store.getters.userId) {
        this.isSelf = false;
      } else {
        this.isSelf = true;
      }
      getVisitorInfo({ userId: this.userId }).then((res) => {
        this.$store.commit("SET_VISITOR_INFO", res.data);
        this.userInfos = Object.assign({}, res.data.user);
        this.other = Object.assign({}, res.data.other);
      });
    },
    toWriteArticle() {
      this.$router.push("/release");
    },
    toRecommendedResources() {
      this.$router.push("/materialRecommend");
    },
  },
  computed: {
    ...mapGetters(["visitorId"]),
  },
  watch: {
    visitorId(value) {
      this.init();
    },
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .container {
    min-width: 1000px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .user-cover {
      width: 100%;
      height: 300px;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      .cover-img {
        width: 100%;
        height: 100%;
      }
      .user-info {
        width: calc(100% - 40px);
        height: 170px;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px;
        .user-info-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .user-avatar {
            width: 100px;
            height: 100px;
            overflow: hidden;
            display: flex;
            align-items: center;
            margin-right: 30px;
            .user-avatar-img {
              width: 100%;
              min-height: 100px;
              border-radius: 50%;
            }
          }
          .user-name {
            text-align: left;
            color: #ffffff;
            cursor: pointer;
            h2:hover {
              color: #5eadff;
            }
          }
        }
      }
    }
    .menu-link {
      width: 100%;
      display: flex;
      height: 50px;
      background: #ffffff;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 10px;
      overflow: hidden;
      align-items: center;
      position: -webkit-sticky;
      position: sticky;
      top: 60px;
      z-index: 100;
      .link-item {
        display: flex;
        align-items: center;
        .item {
          width: 100px;
          cursor: pointer;
          height: 30px;
          line-height: 30px;
          border-radius: 20px;
          background-color: #ffffff;
          color: #4e5358;
        }
        // 活动路由样式
        .router-link-exact-active {
          width: 100px;
          cursor: pointer;
          height: 30px;
          line-height: 30px;
          border-radius: 20px;
          background-color: #5eadff;
          color: #ffffff;
        }
        .router-link-active {
          width: 100px;
          cursor: pointer;
          height: 30px;
          line-height: 30px;
          border-radius: 20px;
          background-color: #5eadff;
          color: #ffffff;
        }
      }
    }
    .router-view {
      width: 100%;
      min-height: 500px;
      border-radius: 10px;
      overflow: hidden;
      background: #ffffff;
      margin-bottom: 20px;
    }
  }
}
</style>
