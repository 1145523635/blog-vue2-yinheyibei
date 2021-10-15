<!--
 * @Descripttion: 单个资源元素
 * @Author: 银河以北
 * @Date: 2021-10-14 21:04:38
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-15 10:36:20
-->
<template>
  <div
    class='app-contaier'
    @click="toMaterialDetails"
  >
    <div class='material-container'>
      <div class="material-info">
        <div class='material-img'><img
            :src="$utils.imgUrl(getMaterial.material_cover)"
            alt="LOGO"
            width="100%"
          >
        </div>
        <div class='material-title'>
          <h4 style="margin-bottom:8px">{{getMaterial.material_name}}</h4>
          <p>{{getMaterial.material_describe}}</p>
        </div>
      </div>
      <div class='material-type'>
        <el-tag
          v-for="(item,index) in getMaterial.typeId"
          size='small'
          effect="plain"
          style="margin-right:5px;color:#000;border-color:#d9d9d9"
        >{{item.typeName.material_name}}</el-tag>
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
        p {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
    .material-type {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
