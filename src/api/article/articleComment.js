/*
 * @Descripttion: 文章评论模块
 * @Author: 银河以北
 * @Date: 2021-08-18 17:22:11
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-02-21 21:38:24
 */

import { request } from '@/utils/request'

/**
 * @Description: 用户发表评论
 * @Author: 银河以北
 * @Date: 2021-08-10 00:02:25
 * @param {*}
 * @return {*}
 */
export function sendArticleComment(data) {
    return request({
        url: 'blog/article/verify/sendArticleComment',
        method: 'POST',
        data
    })
}

/**
 * @Description: 获取文章评论
 * @Author: 银河以北
 * @Date: 2021-08-18 20:13:22
 * @param {*}
 * @return {*}
 */
export function getArticleComment(data) {
    return request({
        url: 'blog/article/release/getArticleComment',
        method: 'GET',
        params: data
    })
}