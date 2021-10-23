<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-10-22 17:00:59
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-23 17:00:40
-->
<template>
  <div class='app-container'>
    <div class='container'>
      <!-- 过滤按钮 -->
      <div class='material-status'>
        <el-button-group>
          <el-button
            :type="filterForm.status==1?'primary':''"
            size="small"
            @click="changeMaterialStatus(1)"
          ><i class='el-icon-remove-outline'></i> 待审核</el-button>
          <el-button
            :type="filterForm.status==2?'success':''"
            size="small"
            @click="changeMaterialStatus(2)"
          ><i class='el-icon-circle-check'></i> 已审核</el-button>
          <el-button
            type=""
            size="small"
            :type="filterForm.status==4?'warning':''"
            @click="changeMaterialStatus(4)"
          ><i class='el-icon-circle-close'></i> 未通过</el-button>
          <el-button
            :type="filterForm.status==3?'danger':''"
            size="small"
            @click="changeMaterialStatus(3)"
          ><i class='el-icon-warning-outline'></i> 下架</el-button>
          <el-button
            size="small"
            @click="changeMaterialStatus(5)"
            :class='{"isCollection":filterForm.status==5}'
          ><i class='el-icon-star-off'></i> 收藏</el-button>
        </el-button-group>
        </el-button-group>

      </div>
      <!-- 资源数据 -->
      <div
        class="not-data"
        v-if="materialList.length == 0"
      >
        <div class="img-container">
          <img
            width="100%"
            :src="notDataImg"
            :alt="notDataImg"
          />
        </div>
      </div>
      <div class='material-container'>
        <div
          v-for="(item,index) in materialList"
          :key='index'
          class='material-item'
        >
          <el-card
            class="box-card"
            shadow="hover"
          >
            <MaertrialItem :materialData='item' />
            <div class='material-operation'>
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                style="margin-right:5px"
                @click="editMaterial(item)"
                v-if='filterForm.status!=5'
              ></el-button>
              <el-popconfirm
                title="你确定要删除这项推荐资源吗？"
                @confirm='deletMaterial(item)'
                v-if='filterForm.status!=5'
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 分页 -->
      <div class='pags-container'>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          small
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserMaterialByStatus,
  userDeleteMaterial,
  getUserCollectionMaterial,
} from "@/api/material/materialRecommend";
import MaertrialItem from "@/components/materialItem/index.vue";
export default {
  name: "Material",
  components: {
    MaertrialItem,
  },
  data() {
    return {
      //过滤表单
      filterForm: {
        status: 2,
        list_rows: 4,
        page: 1,
      },

      //资源列表
      materialList: [],

      //没有数据图片
      notDataImg: require("@/assets/notData/notData.png"),
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const query = Object.assign({}, this.filterForm);
      //收藏数据
      if (query.status == 5) {
        getUserCollectionMaterial().then((res) => {
          this.materialList = Object.assign([], res.data);
        });
      } else {
        getUserMaterialByStatus(query).then((res) => {
          this.materialList = Object.assign([], res.data);
        });
      }
    },

    //切换资源状态
    changeMaterialStatus(status) {
      this.filterForm = {
        status,
      };
      this.init();
    },

    //删除资源
    deletMaterial(item) {
      console.log(item);
    },

    //编辑资源
    editMaterial(item) {
      //label重组
      item.label = [];
      item.typeId.forEach((value) => {
        item.label.push(value.type_id);
      });

      //改变下架的和未通过的状态
      if (item.status == 3 || item.status == 4) {
        item.status = 1;
      }

      //移除不需要的元素
      delete item.update_time;
      delete item.create_time;
      delete item.typeId;

      //跳转页面
      this.$router.push({
        path: "/materialRecommend",
        query: {
          status: "edit",
          data: JSON.stringify(item),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  background: #f5f6f7;
  height: 100%;
  .container {
    width: calc(100% - 40px);
    padding: 20px;
    width: 100%;
    .material-status {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    }
    .not-data {
      width: 100%;
      height: 100%;
      display: flex;
      background-color: #fff;
      justify-content: center;
      align-content: center;
      .img-container {
        width: 400px;
      }
    }
    .material-container {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .material-item {
        margin: 5px;
        .box-card {
          width: 278px;
          .material-operation {
            width: calc(100% - 5px);
            padding: 5px 5px 0 5px;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
    .isCollection {
      background: hotpink;
      color: #fff;
    }
    .pags-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>