/*
 * @Descripttion: 用户收货地址
 * @Author: 银河以北
 * @Date: 2021-08-14 14:38:51
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-06-11 12:12:50
 */

import { request } from '@/utils/request'

/**
 * @Description:前台用户新增收货地址
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function addUserAddress(data) {
    return request({
        url: 'blog/blogUser/addUserAddress',
        method: 'POST',
        data
    })
}

/**
 * @Description:前台用户修改收货地址
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
 export function editUserAddress(data) {
    return request({
        url: 'blog/blogUser/editUserAddress',
        method: 'PUT',
        data
    })
}

/**
 * @Description:用户获取自己的收货地址列表
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function getSelfAddressList() {
    return request({
        url: 'blog/blogUser/getSelfAddressList',
        method: 'GET',
    })
}

/**
 * @Description:更新用户默认地址
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function upDateDefaultAddressId(data) {
    return request({
        url: 'blog/blogUser/upDateDefaultAddressId',
        method: 'PUT',
        data
    })
}

/**
 * @Description:用户删除地址
 * @Author: 银河以北
 * @Date: 2021-08-14 14:39:19
 * @param {*}
 * @return {*}
 */
export function deleteUserAddress(data) {
    return request({
        url: 'blog/blogUser/deleteUserAddress',
        method: 'DELETE',
        data
    })
}