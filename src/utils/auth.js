/*
 * @Descripttion: 对本地token的设置
 * @Author: 银河以北
 * @Date: 2021-06-13 16:25:13
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-21 00:30:26
 */
import Cookies from 'js-cookie'

const TokenKey = 'BLOG-TOKEN'

//获取token
export function getToken() {
    return Cookies.get(TokenKey)
}


//设置token
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}


//移除token
export function removeToken() {
    return Cookies.remove(TokenKey)
}