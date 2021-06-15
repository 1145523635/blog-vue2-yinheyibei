/*
 * @Descripttion: 处理图片路径工具类
 * @Author: 银河以北
 * @Date: 2021-06-01 14:11:58
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-13 15:22:13
 */

import baseSetting from '@/config/defaultSettings' // 引入图片基本访问路径

/**
 * @Description: 处理图片路径工具函数
 * @Author: 银河以北
 * @Date: 2021-06-01 14:30:35
 * @param {*} url 图片路径
 * @return {*}
 */
export function imgUrl(url) {
    if (!url) return false
        // 判断图片链接是否为网络图片或base64
    if (url.substring(0, 4) === 'http' || url.substring(0, 10) === 'data:image') {
        // 网络图片或base64直接返回URL
        return url
    } else {
        // 非网络图片则拼接服务器BASE_URL
        return baseSetting.baseImg + url
    }
}