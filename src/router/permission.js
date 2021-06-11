/*
 * @Descripttion: 全局路由钩子
 * @Author: 银河以北
 * @Date: 2021-06-11 21:40:45
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-11 22:36:13
 */

//引入element-ui 提示框
import { Message } from 'element-ui'

//引入路由
import router from './index'

//引入VUEX
import store from '@/store'

// 白名单重定向
const whiteList = ['/']


//前置路由钩子
router.beforeEach(async(to, from, next) => {

    // 设置页面标题
    document.title = to.meta.title

    //token vuex
    const token = store.getters.token




    if (token) {
        //如果下一跳是登录页 但是存在token 直接跳首页
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            //如果下一跳不是登录页，但是存在token，判断有没有用户信息

            //用户信息 vuex
            const userInfo = store.getters.userInfo

            //如果存在用户信息
            if (userInfo) {
                //直接放过页面
                next()
            } else {
                //如果不存在用户信息 则要去获取用户信息
                try {
                    //调用vuex方法 在vuex发送异步请求
                    store.dispatch('GetInfo').then(res => {
                        console.log(res);
                        next()
                    })
                } catch (err) {
                    //如果在获取途中发生错误 ，直接跳登录页
                    console.log(err)
                }
            }
        }

        next()
    } else {
        //判断下一跳再不在白名单里面
        if (whiteList.includes(to.path)) {
            next()
        } else {
            Message.error('请登录')
        }
    }


})