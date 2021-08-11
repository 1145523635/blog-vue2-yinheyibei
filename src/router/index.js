/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-11 15:58:02
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


/* Layout */
/**
 * LayoutUser 这个layout模块存在用户信息模块
 */
import LayoutUserInfo from '@/layout/haveUserInfo'

import LayoutUserMenu from '@/layout/haveMenu'

/**
 * 引入两个模块的路由
 */
import { layoutUserInfo } from './modules/layoutUserInfo'
import { layoutUserMenu } from './modules/layoutUserMenu'

//防止出现路由冗余
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Yinheyibei',
        component: LayoutUserInfo,
        meta: { title: 'layoutUserInfo' },
        redirect: '/home',
        children: layoutUserInfo
    },
    {
        path: '/user',
        name: 'user',
        meta: { title: '个人中心' },
        redirect: '/userInfo',
        component: LayoutUserMenu,
        meta: { title: 'layoutMenu' },
        children: layoutUserMenu
    },

    /* 404 */
    {
        path: '/404',
        name: '404',
        meta: {
            title: '404'
        },
        component: () =>
            import ('@/views/404/index.vue'),
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router