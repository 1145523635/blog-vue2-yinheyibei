/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-10 12:07:39
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-10 22:04:19
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
/* Layout */
import Layout from '@/layout'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Layout,
        children: [{
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function() {
                return import ( /* webpackChunkName: "about" */ '../views/About.vue')
            }
        }]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router