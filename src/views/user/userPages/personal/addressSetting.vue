<!--
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-13 15:40:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-06-11 13:07:55
-->
<template>
  <div class="app-container">
    <div class="container">

      <!-- 添加收货地址表单 -->
      <div class="address-form">
        <!-- 切换添加、修改-->
        <div class="address-switch">
          <el-button-group>
            <el-button
              :type="isAdd?'primary':''"
              icon="el-icon-plus"
              size="small"
              @click="addAddress()"
            >新增</el-button>

            <el-tooltip
              class="item"
              effect="dark"
              content="请选择右侧已有地址进行修改"
              placement="bottom-end"
            >
              <el-button
                :type="!isAdd?'success':''"
                size="small"
              >编辑 <i class="el-icon-edit"></i></el-button>
            </el-tooltip>
          </el-button-group>
        </div>
        <el-form
          :model="addressForm"
          :rules="addresRules"
          status-icon
          ref="addressForm"
          label-width="120px"
          class="demo-ruleForm"
          style="width:600px"
        >
          <el-form-item
            label="收货人"
            prop="consignee"
          >
            <el-input
              type="text"
              placeholder="请输入收货人姓名"
              v-model="addressForm.consignee"
              autocomplete="off"
              clearable
              size="small"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="mobile"
          >
            <el-input
              type="text"
              placeholder="请输入手机号码"
              v-model="addressForm.mobile"
              autocomplete="off"
              clearable
              size="small"
              maxlength="11"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            label="所在地区"
            prop="provinces"
          >
            <el-cascader
              size="small"
              :options="options"
              v-model="addressForm.provinces"
              @change="handleChange"
              placeholder="省、市、区、街道"
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="详细地址"
            prop="address"
          >
            <el-input
              type="textarea"
              placeholder="小区楼栋/乡村名称"
              v-model="addressForm.address"
              autocomplete="off"
              clearable
              size="small"
              maxlength="200"
              show-word-limit
              :autosize="{ minRows: 4}"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="设置为默认地址"
            prop="is_default"
          >
            <el-switch
              v-model="addressForm.is_default"
              :active-color="isAdd?'':'#13ce66'"
              inactive-color="#ff4949"
              style="width:100%"
            >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              style="width:200px"
              :loading="btnLoading"
              @click='saveData()'
              :type="isAdd?'primary':'success'"
            ><span v-if="isAdd">新增</span><span v-else>更新</span></el-button>
          </el-form-item>
        </el-form>

      </div>

      <!-- 收货地址list -->
      <div class="address-list">
        <div v-if="addressList.length == 0">
          <div>
            <img
              width="100%"
              :src="notDataImg"
              :alt="notDataImg"
            />
            <p class="not-data-text">你还没有添加收货地址，快去添加吧~</p>
          </div>
        </div>
        <div class="address-data">
          <el-card
            class="address-item"
            v-for="(item,index) in addressList"
            :key="index"
          >
            <div class="item-container">
              <div class="item-data">
                <p>
                  <span class="consignee">{{item.consignee}}</span> <span class="mobile">{{item.mobile}}</span>
                </p>
                <p>
                  <span class="province">{{getArea(item.province)}}</span>
                  <span class="province">{{getArea(item.city)}}</span>
                  <span class="province">{{getArea(item.district)}}</span>
                  <span class="province">{{item.address}}</span>
                </p>
              </div>
              <div class="item-operation">
                <i
                  class="el-icon-edit"
                  @click="editAddress(item)"
                ></i>
              </div>
              <div class="item-other">
                <el-radio
                  v-model="defaultAddressId"
                  :label="item.id"
                  @click.native="upDateDefaultAddressId(item.id)"
                  :disabled="radioDisabled"
                >默认地址</el-radio>

                <el-popconfirm
                  confirm-button-text='好的'
                  cancel-button-text='不用了'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除这个收货地址吗？"
                  @confirm="deletAddress(item.id)"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                  >删除</el-button>
                </el-popconfirm>
              </div>
            </div>
          </el-card>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data"; //引入

import {
  addUserAddress,
  getSelfAddressList,
  upDateDefaultAddressId,
  deleteUserAddress,
  editUserAddress,
} from "@/api/user/address";

export default {
  name: "AddressSetting",
  data() {
    return {
      options: regionData, //省市县选择数据

      // loding
      btnLoading: false,

      //地址表单
      addressForm: {
        consignee: "", //收货人
        mobile: "", //电话号码
        is_default: false, //是否是默认地址
        address: "", //详细地址
        provinces: [], //省市县code
      },

      //找回密码表单验证规则
      addresRules: {
        consignee: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "电话号码长度为11哦~", trigger: "blur" },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: "请正确输入手机格式",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { max: 200, message: "详细地址不能大于200字哦~", trigger: "blur" },
        ],
        provinces: [{ required: true, message: "请选省市县", trigger: "blur" }],
      },

      // 地址列表
      addressList: [],

      // 用户默认地址ID
      defaultAddressId: undefined,

      // 单选禁用
      radioDisabled: false,

      //没有数据图片
      notDataImg: require("@/assets/notData/notData.png"),

      // 地址表单状态 true 新增 false 修改
      isAdd: true,

      // 修改地址id 在提交修改表单时使用
      eidtAddressId: undefined,
    };
  },
  created() {
    this.init();
  },

  methods: {
    async init() {
      getSelfAddressList().then((res) => {
        this.addressList = Object.assign([], res.data.addressList);
        this.defaultAddressId = res.data.defaultAddressId;
      });
    },

    //保存数据
    saveData() {
      this.btnLoading = true;
      this.$refs.addressForm.validate((valid) => {
        if (valid) {
          const provinces = this.addressForm.provinces;
          let data = Object.assign({}, this.addressForm);
          data.province = provinces[0] || "";
          data.city = provinces[1] || "";
          data.district = provinces[2] || "";

          // 添加地址
          if (this.isAdd) {
            addUserAddress(data).then((res) => {
              this.init();
              if (res.code == 200) {
                this.$notify({
                  title: "新增成功",
                  message: `成功添加新地址！`,
                  type: "success",
                });
              }
              this.$refs.addressForm.resetFields();
              this.btnLoading = false;
            });
          } else {
            // 修改表单
            data.id = this.eidtAddressId;
            editUserAddress(data).then((res) => {
              console.log(res);
              this.init();
              if (res.code == 200) {
                this.$notify({
                  title: "修改成功",
                  message: `成功修改新地址！`,
                  type: "success",
                });
              }
            });
            this.btnLoading = false;
          }
        } else {
          console.log("error submit!!");
          this.btnLoading = false;
          return false;
        }
      });
    },

    //更新默认地址
    upDateDefaultAddressId(addressId) {
      this.radioDisabled = true;
      upDateDefaultAddressId({ addressId }).then((res) => {
        this.radioDisabled = false;
        this.defaultAddressId = addressId;
        this.$notify({
          title: "修改成功！",
          message: `默认地址更新成功！`,
          type: "success",
        });
      });
    },

    // 删除用户收货地址
    deletAddress(addressId) {
      deleteUserAddress({ addressId }).then((res) => {
        if (res.code == 200) {
          this.init();
          this.$notify({
            title: "删除成功！",
            message: `收货地址删除成功！`,
            type: "success",
          });
        }
      });
    },

    // 修改地址
    editAddress(item) {
      // 修改表单id
      this.eidtAddressId = item.id;

      // 重组数据
      const data = {
        consignee: item.consignee,
        mobile: item.mobile,
        address: item.address,
        is_default: item.is_default == 1 ? true : false,
        provinces: [],
      };
      data.provinces.push(item.province, item.city, item.district);
      this.addressForm = data;
      this.isAdd = false;
    },

    // 新增地址
    addAddress() {
      this.$refs.addressForm.resetFields();
      this.isAdd = true;
    },

    // CodeToText
    getArea(code) {
      return CodeToText[code];
    },
    handleChange(value) {
      // console.log(value);
    },
  },
};
</script>
<style lang="less" scoped>
.app-container {
  width: 100%;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .address-form {
      width: calc(100% - 330px);
      padding: 10px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .address-switch {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: start;
      }
    }
    .address-list {
      width: 300px;
      border-left: 2px solid #5eadff;
      max-height: 500px;
      overflow-y: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      &::-webkit-scrollbar {
        width: 4px;
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

      .not-data-text {
        font-size: 12px;
        color: #b1b1b1;
        text-align: center;
      }
      .address-data {
        padding: 5px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        .address-item {
          margin-bottom: 5px;
          .item-container {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: center;
            .item-data {
              width: 220px;
              text-align: left;
              font-weight: 600;
              .consignee {
                font-size: 14px;
                margin-right: 5px;
              }
              .mobile {
                font-size: 12px;
                font-weight: 400;
                color: #909399;
              }
              .province {
                font-size: 14px;
                margin-right: 5px;
              }
            }
            .item-operation {
              width: calc(100% - 220px);
              cursor: pointer;
            }
            .item-other {
              margin-top: 10px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>