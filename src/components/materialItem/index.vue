<!--
 * @Descripttion: 单个资源元素
 * @Author: 银河以北
 * @Date: 2021-10-14 21:04:38
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-12-10 23:13:59
-->
<template>
  <div class='app-contaier' @click="toMaterialDetails">
    <div class='material-container'>
      <div class="material-info">
        <div class='material-img'><img :src="$utils.imgUrl(getMaterial.material_cover)" alt="LOGO" width="100%">
        </div>
        <div class='material-title'>
          <h4>{{getMaterial.material_name}}</h4>
          <p>{{getMaterial.material_describe}}</p>
        </div>
      </div>
      <div class='material-type'>
        <el-tag v-for="(item,index) in getMaterial.typeId" size='small' effect="plain"
          style="margin-right:5px;color:#000;border-color:#d9d9d9;">{{item.typeName.material_name}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MaterialItem",
    props: {
      materialData: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        material: {},
      };
    },
    created() {
      this.material = Object.assign({}, this.materialData);
    },
    methods: {
      //去到资源详情页
      toMaterialDetails() {
        this.$router.push({
          path: "/materialDetails",
          query: {
            id: this.materialData.id,
          },
        });
      },
    },
    computed: {
      getMaterial() {
        return this.materialData;
      },
    },
  };
</script>


<style lang="less" scoped>
  .app-contaier {
    width: 100%;

    .material-container {
      width: 100%;

      &:hover {
        h4 {
          color: #63b0ff;
        }
      }

      cursor: pointer;
      width: 100%;

      .material-info {
        width: 100%;
        display: flex;
        justify-content: flex-start;

        .material-img {
          width: 80px;
          height: 80px;
          margin-right: 20px;
          background: rgb(250, 250, 250);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .material-title {
          text-align: left;
          width: calc(100% - 80px);

          h4 {
            width: 100%;
            margin-bottom: 8px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          p {
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //行数
            -webkit-box-orient: vertical;
          }
        }
      }

      .material-type {
        display: flex;
        justify-content: flex-start;
        margin-top: 5px;
        width: 100%;
        overflow-x: auto;

        &::-webkit-scrollbar {
          height: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: rgba(144, 147, 153, 0.3);
          border-radius: 2px;
        }

        &::-webkit-scrollbar-track {
          background-color: #f0f2f5;
        }

        &::-webkit-scrollbar-thumb:hover {
          background-color: rgba(144, 147, 153, 0.6);
        }

        &::-webkit-scrollbar-thumb:active {
          background-color: rgba(144, 147, 153, 0.9);
        }
      }
    }
  }
</style>