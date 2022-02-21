/*
 * @Descripttion: 轮播图
 * @Author: 银河以北
 * @Date: 2021-08-14 14:38:51
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-02-21 21:39:07
 */

import { request } from '@/utils/request'

/**
 * @Description:获取轮播图
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function getBannerList() {
    return request({
        url: 'blog/getBannerList',
        method: 'GET',
    })
}