/*
 * @Descripttion: 获取推荐文件
 * @Author: 银河以北
 * @Date: 2021-08-15 21:03:24
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-16 00:21:14
 */
import { request } from '@/utils/request'

/**
 * @Description: 获取可展示的文章列表 默认获取推荐的文章
 * @Author: 银河以北
 * @Date: 2021-08-15 21:04:26
 * @param {*}
 * @return {*}
 */
export function getRecommendArticle() {
    return request({
        url: '/blog/article/release/getRecommendArticle',
        method: 'GET',
    })
}

/**
 * @Description: 文章阅读量增加
 * @Author: 银河以北
 * @Date: 2021-08-16 00:00:36
 * @param {*}
 * @return {*}
 */
export function addArticleBrowse(data) {
    return request({
        url: '/blog/article/release/addArticleBrowse',
        method: 'GET',
        params: data
    })
}