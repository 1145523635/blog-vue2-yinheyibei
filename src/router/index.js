/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-01 12:33:11
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
/* Layout */
import Layout from '@/layout'


//防止出现路由冗余
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Layout,
        meta: { title: 'layout' },
        children: [{
                path: '/',
                name: 'Home',
                meta: { title: 'Home' },
                component: Home,
            }, {
                path: '/about',
                name: 'About',
                meta: { title: 'About' },
                component: function() {
                    return import ('../views/About.vue')
                }
            },
            {
                path: '/test',
                name: 'Test',
                meta: { title: 'Test' },
                component: function() {
                    return import ('../views/Test.vue')
                }
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router