/*
 * @Descripttion: 网络请求封装
 * @Author: 银河以北
 * @Date: 2021-06-11 19:51:04
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-20 15:22:54
 */

//引入axios 对其进行分装
import axios from 'axios'

//引入vuex 获取 token
import store from '@/store'

import { Notification } from 'element-ui'

//引入基本配置 获取基础请求路径
import baseSetting from '@/config/defaultSettings'

export function request(config) {

    // 创建axios的实例
    const instance = axios.create({
        baseURL: baseSetting.baseURL,
        timeout: 5000
    })

    //请求拦截
    instance.interceptors.request.use(config => {
        // 请求前在请求里面添加token
        if (store.getters.token) {
            config.headers['Authorization'] = store.getters.token
        }
        return config
    }, err => {
        console.log(err)
    })

    // 响应拦截
    instance.interceptors.response.use(response => {
        //放过 状态为200 的请求 拦截其他所有的不是200的状态码 统一在这里拦截
        if (response.data.code === 200) {
            return response.data
        }
        //自定义异常拦截
        return handleCode(response);

    }, err => {
        console.log(err)
    })

    // 3.发送真正的网络请求
    return instance(config)
}

//自定义异常拦截
function handleCode(response) {
    //500拦截
    if (response.data.code === 500) {
        let message = '传参错误'
        if (typeof response.data.data == 'string') {
            message = response.data.data
        }
        if (response.data.data instanceof Object) {
            message = '传参错误'
        }

        Notification({
            type: 'error',
            title: '错误',
            message
        })
        return {
            code: 500,
            data: message
        };
    }
    //账号密码错误拦截
    if (response.data.code === 40001) {

        Notification({
            type: 'error',
            title: '错误',
            message: response.data.data
        })
        return {
            code: 40001,
            data: response.data.data
        }
    }
    //账号冻结
    if (response.data.code === 40002) {
        Notification({
            type: 'error',
            title: '错误',
            message: response.data.data
        })
        return {
            code: 40002,
            data: response.data.data
        }
    }

    //账号多点登录（跳入登录页）
    if (response.data.code === 10005) {
        Notification({
            type: 'error',
            title: '错误',
            message: response.data.msg
        })
        return {
            code: 10005,
            data: response.data.data
        }
    }
    //登录过期
    if (response.data.code === 10003) {
        Notification({
            type: 'error',
            title: '错误',
            message: response.data.msg
        })
        return {
            code: 10003,
            data: response.data.data
        }
    }

    //授权token不存在
    if (response.data.code === 10004) {
        Notification({
            type: 'error',
            title: '错误',
            message: response.data.msg
        })

        return {
            code: 10004,
            data: response.data.data
        }
    }
    Notification({
        type: 'error',
        title: '错误',
        message: response.data.message
    })
    return {
        code: 99999,
        data: response.data.data
    }

}