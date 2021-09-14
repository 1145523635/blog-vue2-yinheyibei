/*
 * @Descripttion: 用户关注
 * @Author: 银河以北
 * @Date: 2021-08-14 14:38:51
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-09-13 22:03:06
 */

import { request } from '@/utils/request'

/**
 * @Description:前台用户主动关注用户
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function blogUserFollowUser(data) {
    return request({
        url: '/blog/blogUser/blogUserFollowUser',
        method: 'POST',
        data
    })
}

/**
 * @Description: 前台用户获取关注列表
 * @Author: 银河以北
 * @Date: 2021-09-13 09:51:21
 * @param {*} data
 * @return {*}
 */
export function getUserFollow() {
    return request({
        url: '/blog/blogUser/getUserFollow',
        method: 'GET',
    })
}

/**
 * @Description: 前台用户获取粉丝列表
 * @Author: 银河以北
 * @Date: 2021-09-13 09:51:21
 * @param {*} data
 * @return {*}
 */
export function getUserFans() {
    return request({
        url: '/blog/blogUser/getUserFans',
        method: 'GET',
    })
}