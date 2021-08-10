/*
 * @Descripttion: 对本地token的设置
 * @Author: 银河以北
 * @Date: 2021-06-13 16:25:13
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-10 20:59:41
 */
import Cookies from 'js-cookie'

const TokenKey = 'BLOG-TOKEN'

//获取token
export function getToken() {
    return Cookies.get(TokenKey)
}


//设置token 过期时间是7天
export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: 7 })
}


//移除token
export function removeToken() {
    return Cookies.remove(TokenKey)
}