/*
 * @Descripttion: 文章模块
 * @Author: 银河以北
 * @Date: 2021-06-11 19:52:42
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-01 21:50:09
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
        url: '/blog/article/getArticleReleaseOption',
        method: 'GET',
    })
}