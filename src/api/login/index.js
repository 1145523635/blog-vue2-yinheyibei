/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-11 19:52:42
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-09 09:00:12
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

/**
 * @Description: 用于前台用户退出登录 携带token即可
 * @Author: 银河以北
 * @Date: 2021-06-15 19:23:54
 * @param {*}
 * @return {*}
 */
export function logout() {
    return request({
        url: '/blog/userLogout',
        method: 'POST',
    })
}


/**
 * @Description: 用户前端用户注册获取验证码
 * @Author: 银河以北
 * @Date: 2021-07-03 22:15:20
 * @param {*} data 邮箱email
 * @return {*}
 */
export function getRegisterCode(data) {
    return request({
        url: '/blog/getRegisterCode',
        method: 'POST',
        data
    })
}

/**
 * @Description: 前台用户获取邮箱验证码进行注册
 * @Author: 银河以北
 * @Date: 2021-07-09 08:59:05
 * @param {*} data  邮箱emial 验证码code 密码password
 * @return {*}
 */
export function userRegister(data) {
    return request({
        url: '/blog/userRegister',
        method: 'POST',
        data
    })
}