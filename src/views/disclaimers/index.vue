<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-10-31 20:55:15
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-12-04 13:58:47
-->
<template>
  <div class='app-container'>
    <div class='header'>
      <div class='header-img'>
        <img
          src='@/assets/defaultData/other/disclaimersHeader.jpg'
          alt=""
          style="width:100%;height:100%"
        >
        <div class='message-text'>
          <div>
            <p>免责声明</p>
          </div>
          <div class='under-line'>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class='container'>
      <mavonEditor
        v-model="mdContent"
        ref="md"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :subfield="false"
        :scrollStyle="true"
        :editable="false"
        class='md-content'
      />
    </div>

  </div>
</template>

<script>
//引入markdown富文本编辑器
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getStatement } from "@/api/common/index";
export default {
  name: "Disclaimers",
  components: {
    mavonEditor,
  },
  data() {
    return {
      mdContent: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getStatement({ id: 1 }).then((res) => {
        if (res.code == 200) {
          this.mdContent = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .header {
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    .header-img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      .message-text {
        position: absolute;
        color: #ffffff;
        top: 50%;
        left: 50%;
        text-align: center;
        font-size: 24px;
        transform: translate(-50%, -50%);
        .under-line {
          width: 100%;
          display: flex;
          justify-content: center;
          div {
            width: 90px;
            height: 3px;
            background: #18b2ff;
            margin-top: 5px;
            border-radius: 20px;
          }
        }
      }
    }
  }
  .container {
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    border-radius: 10px;
    .md-content {
      max-height: calc(100vh - 100px);
      z-index: 1;
    }
  }
  margin-bottom: 20px;
}
</style>