/*
 * @Descripttion: 对本地token的设置
 * @Author: 银河以北
 * @Date: 2021-06-13 16:25:13
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-13 17:04:26
 */
import Cookies from 'js-cookie'

const TokenKey = 'BLOG-TOKEN'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}