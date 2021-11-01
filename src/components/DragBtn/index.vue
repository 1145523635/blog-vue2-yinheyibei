<template>
  <div style="position:relative;">
    <div
      class="button-box"
      v-drag
      draggable="false"
    >
      <div class="font-box">
        <el-popover
          placement="top-start"
          width="100"
          trigger="click"
          :visible-arrow='false'
        >
          <div class='menu-container'>
            <div class='menu-item  animate__animated animate__lightSpeedInLeft'>
              <span><i class='el-icon-s-opportunity icon'></i> 意见反馈</span>
            </div>
            <div
              class='menu-item  animate__animated animate__lightSpeedInRight'
              @click="contactusShow=true"
            >
              <span><i class='el-icon-headset icon'></i> 联系我们</span>
            </div>
            <div
              class='menu-item  animate__animated animate__lightSpeedInLeft'
              @click="toAbout()"
            >
              <span><i class='el-icon-user icon'></i> 关于我们</span>
            </div>
            <div
              class='menu-item  animate__animated animate__lightSpeedInRight'
              @click="getUpdateRecord()"
            >
              <span><i class='el-icon-warning icon'></i> 版本更新</span>
            </div>
            <div
              class='menu-item  animate__animated animate__lightSpeedInLeft'
              @click="getDisclaimers()"
            >
              <span><i class='el-icon-info icon'></i> 免责声明</span>
            </div>
            <div class='menu-item  animate__animated animate__lightSpeedInRight'>
              <span>
                <svg-icon
                  icon-class="github-fill"
                  class="icon"
                /> 本站源码（前端）
              </span>
            </div>
          </div>
          <div
            class='btn'
            slot="reference"
          ><i class="el-icon-menu"></i></div>
        </el-popover>
      </div>
    </div>
    <!-- 弹出框 -->
    <div>
      <el-dialog
        title="版本更新记录"
        :visible.sync="updateRecordShow"
        width="30%"
      >
        <div class='update-container'>
          <el-steps
            direction="vertical"
            :active="1"
            :space='50'
          >
            <el-step
              v-for="(item,index) in recordList"
              :key='index'
            >
              <h5
                slot='title'
                style="color:#409EFF"
              >
                {{item.describe}} <el-tag
                  effect="dark"
                  size="mini"
                >{{item.version}}</el-tag>
              </h5>
              <p
                slot='description'
                style="color:#409EFF"
              >{{item.create_time}}</p>
            </el-step>

          </el-steps>
        </div>
      </el-dialog>
      <el-dialog
        title="联系我们"
        :visible.sync="contactusShow"
        width="30%"
      >
        <div class='contactus'>
          <div><img
              width="150px"
              height="220px"
              :src="imgs.QQ"
              alt="QQ"
            ></div>
          <div><img
              width="150px"
              height="220px"
              :src="imgs.WX"
              alt="WX"
            ></div>
        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUpdateRecordList } from "@/api/common/index";
export default {
  name: "DragBtn",
  data() {
    return {
      //更新记录弹窗
      updateRecordShow: false,
      contactusShow: false,

      //更新记录
      recordList: [],

      //需要用到的图片
      imgs: {
        QQ: require("@/assets/author/QQ.png"),
        WX: require("@/assets/author/WX.png"),
      },
    };
  },
  methods: {
    //获取版本更新记录
    getUpdateRecord() {
      getUpdateRecordList().then((res) => {
        this.recordList = Object.assign([], res.data);
      });
      this.updateRecordShow = true;
    },

    //去免责声明页面
    getDisclaimers() {
      this.$router.push("/disclaimers");
    },

    //去关于页面
    toAbout() {
      this.$router.push("/about");
    },

    mousedowm(e) {
      // 鼠标按下时的鼠标所在的X，Y坐标
      this.mouseDownX = e.pageX;
      this.mouseDownY = e.pageY;
      // 初始位置的X，Y 坐标
      // this.initX = obj.offsetLeft;
      // this.initY = obj.offsetTop;
      console.log("e", e);
      // 表示鼠标已按下
      this.flag = true;
    },
    mousemove(e) {
      if (this.flag) {
        console.log("e :", e);
      }
    },
  },
  directives: {
    drag(el) {
      let oDiv = el; // 当前元素
      // let self = this // 上下文
      // 禁止选择网页上的文字
      document.onselectstart = function () {
        return false;
      };
      oDiv.onmousedown = function (e) {
        // 鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          // 移动当前元素
          oDiv.style.left = l + "px";
          oDiv.style.top = t + "px";
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false;
      };
    },
  },
};
</script>

<style scoped lang="scss">
.button-box {
  width: 80px;
  border-radius: 50%;
  position: fixed;
  bottom: 80px;
  right: 50px;
  padding-left: 15px;
  padding-top: 8px;
  cursor: pointer;
  opacity: 0.7;
  z-index: 888;
}
.btn-bg-img {
  width: 80px;
  height: 80px;
  /* background-image: url("../../../static/images/click.png"); */
  background-size: cover;
}
.button-box:hover {
  color: white;
  opacity: 1;
}

.font-box {
  width: 50px;
  .btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background: #66b1ff;
    color: #fff;
    line-height: 50px;
  }
}
.menu-container {
  padding: 5px;
  width: calc(100% - 10px);
  .menu-item {
    width: 100%;
    cursor: pointer;
    line-height: 30px;
    .icon {
      margin-right: 5px;
    }
  }
}
.update-container {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  /* 滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: 5px;
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
.contactus {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
