/*
 * @Descripttion: 全局路由钩子
 * @Author: 银河以北
 * @Date: 2021-06-11 21:40:45
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-31 20:58:45
 */

//引入element-ui 提示框
import { Message } from 'element-ui'

//引入路由
import router from './index'

//引入VUEX
import store from '@/store'

//引入全局登录框
import { LoginBox } from '@/components/loginBox/index'

//引入获取从cookie获取token的方法
import { getToken } from '@/utils/auth' // get token from cookie


//引入进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单重定向
const whiteList = ['/', '/resources', '/404', '/home', '/readArticle', '/materialDetails', '/blogAbout', '/achievements', '/disclaimers']



//前置路由钩子
router.beforeEach(async(to, from, next) => {

    // 开始进度条
    NProgress.start()

    // 设置页面标题
    document.title = to.meta.title

    //token cookie
    const token = getToken()
    if (token) {
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
                //调用vuex方法 在vuex发送异步请求 凑一个gitee记录
                store.dispatch('GetInfo').then(res => {
                    if (res.code == 200) {
                        next()
                        NProgress.done()
                    } else {
                        Message.error('获取信息发送错误')
                    }
                })
            } catch (err) {
                Message.error('获取信息发送错误,请刷新页面')
                    //如果在获取途中发生错误 ，直接跳登录页
                console.log(err)
            }
        }
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