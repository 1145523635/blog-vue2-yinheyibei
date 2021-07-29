<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-29 19:25:01
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-29 20:57:09
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 富文编辑器 -->
      <div class="mark-down">
        <mavonEditor
          ref="editor"
          :subfield="false"
          v-model="doc"
          @save="saveDoc"
          style="height: 100%"
        />
      </div>
      <div v-html="docs">}</div>
    </div>
  </div>
</template>

<script>
//引入markdown富文本编辑器
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "Release",
  components: {
    mavonEditor,
  },
  data() {
    return {
      doc: "12",
      docs: null,
    };
  },
  methods: {
    saveDoc(markdown, html) {
      this.docs = html;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .mark-down {
      width: 100%;
      z-index: 0;
      max-height: 500px;
    }
  }
}
</style>