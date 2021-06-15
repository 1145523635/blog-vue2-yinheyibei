/*
 * @Descripttion: 导出全局登录组件
 * @Author: 银河以北
 * @Date: 2021-06-13 22:06:12
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-15 15:04:04
 */

import Vue from 'vue'
import Login from './LoginBox.vue'


const LoginBox = Vue.extend(Login)

LoginBox.install = function() {
    let instance = new LoginBox({}).$mount()
    Vue.nextTick(() => {
        instance.show = true
    })
}

export { LoginBox }