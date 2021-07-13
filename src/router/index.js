/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-13 15:51:36
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


/* Layout */
/**
 * LayoutUser 这个layout模块存在用户信息模块
 */
import LayoutUserInfo from '@/layout/haveUserInfo'

import LayoutUserMenu from '@/layout/haveMenu'


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
        redirect: '/',
        children: [{
                path: '/',
                name: 'Home',
                meta: { title: '首页' },
                component: Home,
            }, {
                path: 'about',
                name: 'About',
                meta: { title: '关于' },
                component: function() {
                    return import ('../views/About.vue')
                }
            },
            {
                path: 'test',
                name: 'Test',
                meta: { title: '测试' },
                component: function() {
                    return import ('../views/Test.vue')
                }
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        meta: { title: '个人中心' },
        redirect: '/userInfo',
        component: LayoutUserMenu,
        meta: { title: 'layoutMenu' },
        children: [{
            path: '/userInfo',
            name: 'UserINfo',
            meta: { title: '用户信息' },
            redirect: '/userInfo/release',
            component: () =>
                import ('@/views/user/userInfo.vue'),
            children: [{
                    path: 'personal',
                    name: 'Personal',
                    meta: { title: '个人资料' },
                    redirect: '/userInfo/personal/baseSetting',
                    component: () =>
                        import ('@/views/user/userPages/personal.vue'),
                    children: [{
                            path: 'baseSetting',
                            name: 'BaseSetting',
                            meta: {
                                title: '基本配置',
                            },
                            component: () =>
                                import ('@/views/user/userPages/personal/baseSetting.vue')
                        },
                        {
                            path: 'securitySetting',
                            name: 'SecuritySetting',
                            meta: {
                                title: '安全配置',
                            },
                            component: () =>
                                import ('@/views/user/userPages/personal/securitySetting.vue')
                        }
                    ]
                },
                {
                    path: 'collection',
                    name: 'Collection',
                    meta: { title: '用户收藏' },
                    component: () =>
                        import ('@/views/user/userPages/collection.vue'),
                },
                {
                    path: 'comment',
                    name: 'Comment',
                    meta: { title: '用户评论' },
                    component: () =>
                        import ('@/views/user/userPages/comment.vue'),
                },
                {
                    path: 'follow',
                    name: 'Follow',
                    meta: { title: '用户关注' },
                    component: () =>
                        import ('@/views/user/userPages/follow.vue'),
                },
                {
                    path: 'release',
                    name: 'Release',
                    meta: { title: '用户发布' },
                    component: () =>
                        import ('@/views/user/userPages/release.vue'),
                }
            ]
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router