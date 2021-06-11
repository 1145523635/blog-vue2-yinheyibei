/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-11 20:49:03
 */
import Vue from 'vue'
import Vuex from 'vuex'

//引入用户部分的VUEX
import user from './modules/user'

//引入全局的getters方法
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user
    },
    getters
})