/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-18 14:48:25
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/permission' // 全局路由钩子

//给vuex设置token
import { getToken } from '@/utils/auth'
store.commit('SET_TOKEN', getToken())

//animate动画库
import 'animate.css'

//引入md5加密方式
import md5 from 'js-md5';
import { imgUrl } from '@/utils/imgUrl' // 导入自己处理图片路径的工具类
import { getPastTimes } from "@/utils/time"; //时间处理类

//音乐播放器全局注册
import APlayer from "@moefe/vue-aplayer";
Vue.use(APlayer);

//引入element-ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入全局注册组件
import { LoginBox } from '@/components/loginBox/index'
Vue.prototype.$Login = LoginBox.install;



//把自定义的工具类挂载在vue实例上
Vue.prototype.$utils = {
    md5,
    imgUrl,
    getPastTimes
};



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')