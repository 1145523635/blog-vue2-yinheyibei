/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-11 19:52:42
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-11 22:33:19
 */
import { request } from '@/utils/request'

/**
 * @Description: 用户登录 
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} data 账号、密码 account password
 * @return {*}
 */
export function login(data) {
    return request({
        url: '/blog/login',
        method: 'POST',
        data
    })
}

/**
 * @Description: 获取用户信息 携带token即可
 * @Author: 银河以北
 * @Date: 2021-06-11 22:32:57
 * @param {*}
 * @return {*}
 */
export function getUserInfo() {
    return request({
        url: '/blog/getUserInfo',
        method: 'GET',
    })
}