/*
 * @Descripttion: 文章模块
 * @Author: 银河以北
 * @Date: 2021-06-11 19:52:42
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-02-21 21:39:01
 */
import { request } from '@/utils/request'

/**
 * @Description: 返回前端发布文章时需要的文章选项 包括文章分类、专题、标签
 * @Author: 银河以北
 * @Date: 2021-08-01 21:50:02
 * @param {*}
 * @return {*}
 */
export function getArticleReleaseOption() {
    return request({
        url: 'blog/article/release/getArticleReleaseOption',
        method: 'GET',
    })
}

/**
 * @Description: 前台用户发布自己文章
 * @Author: 银河以北
 * @Date: 2021-08-03 00:59:12
 * @param {*} data
 * @return {*}
 */
export function blogUserReleaseContent(data) {
    return request({
        url: 'blog/article/verify/blogUserReleaseContent',
        method: 'POST',
        data
    })
}


/**
 * @Description: 修改时获取文章数据
 * @Author: 银河以北
 * @Date: 2021-08-03 00:59:12
 * @param {*} data
 * @return {*}
 */
export function getEditArticle(data) {
    return request({
        url: 'blog/article/verify/getEditArticle',
        method: 'GET',
        params: data
    })
}