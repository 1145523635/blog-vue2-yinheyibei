/*
 * @Descripttion: 留言
 * @Author: 银河以北
 * @Date: 2021-08-14 14:38:51
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-12-02 22:24:56
 */

import { request } from '@/utils/request'

/**
 * @Description:新增新的留言
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function publishMessage(data) {
    return request({
        url: '/blog/message/verify/publishMessage',
        method: 'POST',
        data
    })
}

/**
 * @Description:获取留言列表
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function getMessageList(data) {
    return request({
        url: '/blog/message/release/getMessageList',
        method: 'GET',
        params: data
    })
}