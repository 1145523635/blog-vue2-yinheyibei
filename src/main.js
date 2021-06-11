/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-11 21:42:00
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/permission' // 全局路由钩子
//引入element-ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入md5加密方式
import md5 from 'js-md5';

//把自定义的工具类挂载在vue实例上
Vue.prototype.$utils = {
    md5
};

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')