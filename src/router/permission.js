/*
 * @Descripttion: 全局路由钩子
 * @Author: 银河以北
 * @Date: 2021-06-11 21:40:45
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-15 22:27:32
 */

//引入element-ui 提示框
import { Message } from 'element-ui'

//引入路由
import router from './index'

//引入VUEX
import store from '@/store'

//引入全局登录框
import { LoginBox } from '@/components/index'

//引入获取从cookie获取token的方法
import { getToken } from '@/utils/auth' // get token from cookie


//引入进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
    // 白名单重定向
const whiteList = ['/', '/about', '/test']



//前置路由钩子
router.beforeEach(async(to, from, next) => {
    // 开始进度条
    NProgress.start()


    console.log(store.getters.userInfo)
        // 设置页面标题
    document.title = to.meta.title

    //token cookie
    const token = getToken()


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
                NProgress.done()
            } else {
                //如果不存在用户信息 则要去获取用户信息
                try {

                    // //调用vuex方法 在vuex发送异步请求
                    store.dispatch('GetInfo').then(res => {
                        if (res.code == 200) {
                            console.log(store.getters.userInfo)
                            next('/')
                            NProgress.done()
                        } else {
                            Message.error('获取信息发送错误')
                        }

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
            NProgress.done()
        } else {

            Message.error('请登录')
            LoginBox.install();
        }
    }


})