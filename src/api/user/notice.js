/*
 * @Descripttion: 消息通知
 * @Author: 银河以北
 * @Date: 2021-08-14 14:38:51
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-09-06 21:39:19
 */

import { request } from '@/utils/request'

/**
 * @Description: 获取消息通知列表
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function getNoticeList(data) {
    return request({
        url: '/blog/blogUser/getNoticeList',
        method: 'GET',
        params: data
    })
}

/**
 * @Description: 修改消息未读标识
 * @Author: 银河以北
 * @Date: 2021-08-14 23:07:05
 * @param {*} data
 * @return {*}
 */
export function isReadNotice(data) {
    return request({
        url: '/blog/blogUser/isReadNotice',
        method: 'POST',
        data
    })
}