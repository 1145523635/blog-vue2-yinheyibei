/*
 * @Descripttion: 网络请求封装
 * @Author: 银河以北
 * @Date: 2021-06-11 19:51:04
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-11 22:28:12
 */

//引入axios 对其进行分装
import axios from 'axios'

//引入vuex 获取 token
import store from '@/store'

//引入基本配置 获取基础请求路径
import baseSetting from '@/config/defaultSettings'

export function request(config) {
    // 1.创建axios的实例
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
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    // 3.发送真正的网络请求
    return instance(config)
}