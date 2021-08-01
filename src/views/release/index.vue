<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-29 19:25:01
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-01 22:33:39
-->
<template>
  <div class="app-container">
    <div class="container">
      <!-- 文章标题 -->
      <div class="article-title">
        <input
          type="text"
          @mouseover="mouseover"
          @mouseleave="mouseleave"
          placeholder="请输入文章标题"
          class="title-input"
        />
        <div class="split-line" ref="split-line"></div>
      </div>
      <!-- 富文编辑器 -->
      <div class="mark-down">
        <mavonEditor
          ref="editor"
          :subfield="false"
          v-model="articleForm.doc"
          @save="saveDoc"
        />
      </div>
      <!-- 选项文章选项 -->
      <div class="article-option">
        <el-form ref="form" :model="articleForm">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="7"
              ><div>
                <el-form-item label="文章分类">
                  <el-select
                    v-model="articleForm.classificationId"
                    size="mini"
                    style="width: 100%"
                    clearable
                    placeholder="请选择当前文章的类型"
                  >
                    <el-option
                      v-for="item in classificationOptions"
                      :key="item.id"
                      :label="item.classification_name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
            <el-col :span="7"
              ><div>
                <el-form-item label="文章专题">
                  <el-select
                    v-model="articleForm.specialId"
                    size="mini"
                    style="width: 100%"
                    multiple
                    clearable
                    placeholder="请选择当前文章的专题"
                  >
                    <el-option
                      v-for="item in specialOptions"
                      :key="item.id"
                      :label="item.special_name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
            <el-col :span="7"
              ><div>
                <el-form-item label="文章标签">
                  <el-select
                    v-model="articleForm.labelId"
                    size="mini"
                    style="width: 100%"
                    multiple
                    clearable
                    placeholder="请选择当前文章的标签"
                  >
                    <el-option
                      v-for="item in labelOptions"
                      :key="item.id"
                      :label="item.label_name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//引入markdown富文本编辑器
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getArticleReleaseOption } from "@/api/article/releaseArticle";
export default {
  name: "Release",
  components: {
    mavonEditor,
  },
  data() {
    return {
      articleForm: {
        doc: "",
        classificationId: "", //文章分类ID
        specialId: "", //文章专题ID
        labelId: "", //文章标签ID
      },

      //文章分类选项 （单选）
      classificationOptions: [],

      //文章专题选项 （多选）
      specialOptions: [],

      //文章标签选项 （多选）
      labelOptions: [],
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      //初始化文章选项数据
      getArticleReleaseOption().then((res) => {
        this.classificationOptions = res.data.classification;
        this.specialOptions = res.data.special;
        this.labelOptions = res.data.label;
      });
    },
    saveDoc(markdown, html) {
      this.docs = html;
    },

    //鼠标移入输入框
    mouseover() {
      this.$refs["split-line"].classList.add("split-line-active");
    },
    mouseleave() {
      this.$refs["split-line"].classList.remove("split-line-active");
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
    .article-title {
      width: 100%;
      padding: 20px;
      height: 20px;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 10px;
      height: 30px;
      position: relative;
      .title-input {
        border: none;
        border-bottom: 1px solid #f3f3f3;
        width: 100%;
        outline: none;
        line-height: 30px;
        z-index: 0;
        font-size: 18px;
      }
      .split-line {
        position: absolute;
        background: #7bbdf8;
        bottom: 21px;
        z-index: 100;
        transition: width 2s;
        height: 1px;
      }
      .split-line-active {
        transition: 2s;
        width: calc(100% - 40px);
      }
    }

    .mark-down {
      width: 100%;
      z-index: 0;
      max-height: 500px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .article-option {
      width: 100%;
      padding: 10px;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 10px;
    }
  }
}
</style>