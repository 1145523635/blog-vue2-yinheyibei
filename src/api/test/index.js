/*
 * @Descripttion: 测试类型接口
 * @Author: 银河以北
 * @Date: 2021-06-11 19:52:42
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-09-05 09:53:14
 */
import { request } from '@/utils/request'

/**
 * @Description: 用户登录 
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} data 账号、密码 account password
 * @return {*}
 */
export function sendMessages() {
    return request({
        url: '/test/test',
        method: 'GET',
    })
}