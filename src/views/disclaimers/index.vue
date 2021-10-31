<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-10-31 20:55:15
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-31 22:06:15
-->
<template>
  <div class='app-container'>
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