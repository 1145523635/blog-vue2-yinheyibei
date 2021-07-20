/*
 * @Descripttion: 用户信息获取 && 修改
 * @Author: 银河以北
 * @Date: 2021-07-21 00:23:22
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-21 00:47:11
 */


import { request } from '@/utils/request'

/**
 * @Description: 用户登录 
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} data 账号、密码 account password
 * @return {*}
 */
export function getBlogUserInfo() {
    return request({
        url: '/blog/blogUser/getBlogUserInfo',
        method: 'GET',
    })
}