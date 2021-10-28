/*
 * @Descripttion: 获取版本更新记录
 * @Author: 银河以北
 * @Date: 2021-06-11 19:52:42
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-27 14:10:23
 */
import { request } from '@/utils/request'

/**
 * @Description: 博客前台接口分组 
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} data 账号、密码 account password
 * @return {*}
 */
export function getUpdateRecordList() {
    return request({
        url: '/blog/common/release/getUpdateRecordList',
        method: 'GET',

    })
}