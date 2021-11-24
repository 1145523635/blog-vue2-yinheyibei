/*
 * @Descripttion: 音乐
 * @Author: 银河以北
 * @Date: 2021-08-14 14:38:51
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-21 13:40:00
 */

import { request } from '@/utils/request'

/**
 * @Description:获取音乐
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function getMusicList() {
    return request({
        url: '/blog/getMusicList',
        method: 'GET',
    })
}