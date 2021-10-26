/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-25 14:13:03
 */
import Vue from 'vue'
import Vuex from 'vuex'

//引入用户部分的VUEX
import user from './modules/user'

//引入访客部分的VUEX
import visitor from './modules/visitor'

//引入全局的getters方法
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        visitor
    },
    getters
})