<!--
 * @Descripttion: 资源推荐
 * @Author: 银河以北
 * @Date: 2021-10-12 22:43:01
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-23 13:55:44
-->
<template>
  <div class='app-container'>
    <div class='container'>
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span class='recommend-title'>推荐资源</span>
        </div>
        <div class='material-form'>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
            <el-form-item
              label="名称"
              prop="material_name"
            >
              <el-input
                v-model="ruleForm.material_name"
                size="small"
                placeholder="请输入资源名称"
                clearable
                maxlength="20"
                show-word-limit
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="检测是否有重复资源"
                  placement="top"
                  slot="append"
                >
                  <el-button
                    icon="el-icon-search"
                    @click="testRepeat"
                    :loading='loading.testLoading'
                  ></el-button>
                </el-tooltip>
              </el-input>
            </el-form-item>
            <el-form-item
              label="描述"
              prop="material_describe"
            >
              <el-input
                placeholder="请输入资源简短描述"
                v-model="ruleForm.material_describe"
                size="small"
                clearable
                maxlength="20"
                show-word-limit
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="链接"
              prop="material_link"
            >
              <el-input
                placeholder="请输入正确的网址链接"
                v-model="ruleForm.material_link"
                size="small"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="标签"
              prop="label"
            >
              <el-select
                size="small"
                v-model="ruleForm.label"
                placeholder="请选择"
                style="width:100%"
                multiple
                :multiple-limit='5'
              >
                <el-option-group
                  v-for="(item,index) in materialOption"
                  :key="index"
                  :label="item.material"
                >
                  <el-option
                    v-for="(value,key) in item.materialTypeOption"
                    :key="value.id"
                    :label="value.material_name"
                    :value="value.id"
                  >
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item
              label="LOGO"
              prop="material_cover"
            >
              <div class="upload-avatar">
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  :headers="headers"
                  :data="uploadData"
                  :multiple="false"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="ruleForm.material_cover"
                    :src="$utils.imgUrl(ruleForm.material_cover)"
                    class="avatar"
                  />
                  <div v-else>
                    <i class="el-icon-plus avatar-uploader-icon el-upload"></i>
                  </div>

                </el-upload>
              </div>
            </el-form-item>
            <el-form-item
              label="详情"
              prop="material_details"
            >
              <el-input
                placeholder="请介绍该资源的作用、用法"
                v-model="ruleForm.material_details"
                size="small"
                clearable
                maxlength="200"
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="saveData()"
                :loading='loading.saveLoading'
              ><span v-if='isAdd'>立即分享</span><span v-else>重新提交</span></el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="已有相似资源"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-card shadow="hover">
        <MaertrialItem
          :materialData='item'
          v-for='(item,index) in materialData'
          :key='index'
        />
      </el-card>
      <div class='pagination'>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pages.total"
          :page-size='pages.list_rows'
          :current-page='pages.page'
          @current-change='currentChange'
        >
        </el-pagination>
      </div>
      <span
        slot="footer"
        v-if='showSubmitUtils'
      >
        <el-button
          @click="handleClose"
          size="small"
        >我在想想</el-button>
        <el-button
          type="primary"
          @click="submitSave"
          size="small"
          :loading='loading.submitLoading'
        >确定提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import baseSetting from "@/config/defaultSettings"; // 引入全局基本配置
import MaertrialItem from "@/components/materialItem/index.vue";
import {
  getMaterialType,
  addNewMaterialRecommend,
  getMaterialByName,
  editMaterialRecommend,
} from "@/api/material/materialRecommend";
export default {
  name: "MaterialRecommend",
  components: {
    MaertrialItem,
  },
  data() {
    return {
      //表单数据
      ruleForm: {
        material_name: "",
        material_describe: "",
        material_details: "",
        material_link: "",
        material_cover: "",
        material_cover_id: "",
        label: [],
      },

      //表单验证规则
      rules: {
        material_name: [
          { required: true, message: "请输入资源名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "名称长度在1到20之间",
            trigger: "blur",
          },
        ],
        material_describe: [
          { required: true, message: "请输入资源描述", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "描述长度在1到20之间",
            trigger: "blur",
          },
        ],
        material_link: [
          { required: true, message: "请输入资源链接", trigger: "blur" },
          {
            pattern:
              /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
            message: "请正确输入链接或网址格式",
            trigger: "blur",
          },
        ],
        material_details: [
          { required: true, message: "请输入资源详情", trigger: "blur" },
          {
            max: 200,
            message: "资源详情应小于200字之间",
            trigger: "blur",
          },
        ],
        label: [{ required: true, message: "资源标签必选", trigger: "change" }],
        material_cover: [
          { required: true, message: "LOGO必传", trigger: "blur" },
        ],
      },

      // 组件上传额外参数
      uploadData: {
        module: "blog",
      },

      //分类选项
      materialOption: [],

      //loading动画
      loading: {
        saveLoading: false,
        testLoading: false,
        submitLoading: false,
      },

      //弹窗控制变量
      dialogVisible: false,

      //资源数据
      materialData: [],

      //分页参数
      pages: {
        page: 1,
        list_rows: 1,
        total: 0,
      },

      //提交工具栏
      showSubmitUtils: false,

      //判断是添加还行编辑
      isAdd: true,
    };
  },
  created() {
    this.isAdd = true;
    //将当前页面变为编辑页面
    if (this.$route.query.status == "edit") {
      this.isAdd = false;
      this.ruleForm = Object.assign({}, JSON.parse(this.$route.query.data));
    }
    console.log(this.$route.query);

    this.init();
  },
  methods: {
    //数据初始化
    init() {
      getMaterialType().then((res) => {
        this.materialOption = Object.assign([], res.data);
      });
    },

    //提交数据
    saveData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const testQuery = {
            name: this.ruleForm.material_name,
            ...this.pages,
          };
          //先验证重复资源
          getMaterialByName(testQuery).then((res) => {
            if (res.code == 200) {
              if (res.data.data.length > 0) {
                this.pages.total = res.data.total;
                this.pages.page = res.data.current_page;
                this.materialData = Object.assign([], res.data.data);
                this.dialogVisible = true;
                this.showSubmitUtils = true;
              } else {
                this.submitSave();
              }
            }
          });
        } else {
          this.loading.submitLoading = false;
          return false;
        }
      });
    },

    //确认提交数据
    submitSave() {
      this.loading.submitLoading = true;
      this.loading.saveLoading = true;
      const query = Object.assign({}, this.ruleForm);
      if (this.isAdd) {
        addNewMaterialRecommend(query).then((res) => {
          this.loading.submitLoading = false;
          this.loading.saveLoading = false;
          if (res.code == 200) {
            this.$notify({
              title: "成功",
              message: "您推荐的资源将在1-3个工作日内被管理人员审核",
              type: "success",
            });
            this.$router.push({
              path: "/materialResult",
              query: {
                id: res.data,
              },
            });
          }
        });
      } else {
        editMaterialRecommend(query).then((res) => {
          if (res.code == 200) {
            this.$notify({
              title: "成功",
              message: "你的资源已重新编辑，但是资源审核状态不会改变！",
              type: "success",
            });
            this.$router.push({
              path: "/materialResult",
              query: {
                id: query.id,
              },
            });
          }
        });
      }
    },

    //检测重复资源
    testRepeat() {
      this.loading.testLoading = true;
      if (this.ruleForm.material_name == "") {
        this.$message({
          message: "请先输入资源名称！",
          type: "warning",
        });
        this.loading.testLoading = false;
      } else {
        const query = { name: this.ruleForm.material_name, ...this.pages };
        getMaterialByName(query).then((res) => {
          this.loading.testLoading = false;
          if (res.code == 200) {
            if (res.data.data.length > 0) {
              this.pages.total = res.data.total;
              this.pages.page = res.data.current_page;
              this.materialData = Object.assign([], res.data.data);
              this.dialogVisible = true;
            } else {
              this.$message({
                message: "未发现有重复资源",
                type: "success",
              });
            }
          }
        });
      }
    },

    //头像上传成后
    handleAvatarSuccess(response) {
      if (response.code == 200) {
        this.ruleForm.material_cover_id = response.data.id;
        this.ruleForm.material_cover = response.data.img_path;
        this.$notify({
          title: "LOGO上传成功",
          message: "你的头像已经上传成功，记得点击保存按钮哦！",
          type: "success",
        });
      }
    },

    //头像上传之前
    beforeAvatarUpload(file) {
      const regs = /.+?(\.jpg|\.png|\.jpeg|\.PNG|\.JPG)/g;
      const isImg = regs.test(file.name);
      const isLt5M = file.size / 1024 < 5000;
      if (!isImg) {
        this.$notify.error({
          title: "文件格式错误",
          message: "请上传jpg或者png格式图片",
        });
        return false;
      }
      if (!isLt5M) {
        this.$notify.error({
          title: "文件大小错误",
          message: "图片不能大于5M！",
        });
        return false;
      }
    },

    //弹窗关闭回调
    handleClose() {
      this.showSubmitUtils = false;
      this.dialogVisible = false;
    },

    //分页变化
    currentChange(current) {
      this.pages.page = current;
      const query = { name: this.ruleForm.material_name, ...this.pages };
      //重新请求赋值
      getMaterialByName(query).then((res) => {
        this.pages.total = res.data.total;
        this.pages.page = res.data.current_page;
        this.materialData = Object.assign([], res.data.data);
      });
    },
  },
  computed: {
    // 动态拼接上传路径
    action() {
      return baseSetting.baseURL + baseSetting.uploadImgUrl;
    },

    // 设置请求头参数 token
    headers() {
      return {
        Authorization: this.$store.getters.token,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  .container {
    width: 100%;
    margin-bottom: 20px;
    .box-card {
      width: 100%;
      .clearfix {
        text-align: left;
        @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
          .recommend-title {
            background-image: -webkit-linear-gradient(
              left,
              #409eff,
              #ffd90c 25%,
              #409eff 50%,
              #ffd90c 75%,
              #409eff
            );
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            -webkit-background-size: 200% 100%;
            -webkit-animation: masked-animation 1s infinite linear;
          }
        }

        @-webkit-keyframes masked-animation {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        .recommend-title {
          font-weight: 800;
        }
      }
      .material-form {
        width: 100%;
      }
    }
    .upload-avatar {
      display: flex;
      justify-content: flex-start;
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 128px;
        height: 128px;
        text-align: center;
      }
      .avatar {
        width: 128px;
        height: 128px;
        display: block;
        border-radius: 5px;
      }
    }
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
