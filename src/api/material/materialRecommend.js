/*
 * @Descripttion: 资源分类
 * @Author: 银河以北
 * @Date: 2021-06-11 19:52:42
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-24 15:04:45
 */
import { request } from '@/utils/request'

/**
 * @Description: 获取资源分类
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*}
 * @return {*}
 */
export function getMaterialType() {
    return request({
        url: '/blog/material/release/getMaterialType',
        method: 'GET',
    })
}

/**
 * @Description: 新增资源分类
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function addNewMaterialRecommend(data) {
    return request({
        url: '/blog/material/verify/addNewMaterialRecommend',
        method: 'POST',
        data
    })
}

/**
 * @Description: 通过id获取资源
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function getMaterialById(data) {
    return request({
        url: '/blog/material/release/getMaterialById',
        method: 'GET',
        params: data
    })
}

/**
 * @Description: 通过名字查询是否有重复资源
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function getMaterialByName(data) {
    return request({
        url: '/blog/material/release/getMaterialByName',
        method: 'GET',
        params: data
    })
}

/**
 * @Description: 根据资源ID获取资源详细信息
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function getMaterialDetails(data) {
    return request({
        url: '/blog/material/release/getMaterialDetails',
        method: 'GET',
        params: data
    })
}

/**
 * @Description: 首页获取资源列表（分页）
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function getMaterialListByPages(data) {
    return request({
        url: '/blog/material/release/getMaterialListByPages',
        method: 'GET',
        params: data
    })
}

/**
 * @Description: 资源浏览量+1
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function addMaterialBrowse(data) {
    return request({
        url: '/blog/material/release/addMaterialBrowse',
        method: 'PUT',
        data
    })
}

/**
 * @Description: 资源收藏+1
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function addMaterialLike(data) {
    return request({
        url: '/blog/material/verify/addMaterialLike',
        method: 'POST',
        data
    })
}

/**
 * @Description: 判断用户是否关注该资源
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function hasCollection(data) {
    return request({
        url: '/blog/material/verify/hasCollection',
        method: 'POST',
        data
    })
}

/**
 * @Description: 用户通过状态获取资源
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function getUserMaterialByStatus(data) {
    return request({
        url: '/blog/material/verify/getUserMaterialByStatus',
        method: 'GET',
        params: data
    })
}

/**
 * @Description: 用户删除资源
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function userDeleteMaterial(data) {
    return request({
        url: '/blog/material/verify/userDeleteMaterial',
        method: 'DELETE',
        data
    })
}


/**
 * @Description: 用户更新资源
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function editMaterialRecommend(data) {
    return request({
        url: '/blog/material/verify/editMaterialRecommend',
        method: 'PUT',
        data
    })
}

/**
 * @Description: 用户更新资源
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function getUserCollectionMaterial(data) {
    return request({
        url: '/blog/material/verify/getUserCollectionMaterial',
        method: 'GET',
        params: data
    })
}

/**
 * @Description: 移除用户关注
 * @Author: 银河以北
 * @Date: 2021-06-11 22:31:59
 * @param {*} 
 * @return {*}
 */
export function deleteUserCollectionMaterial(data) {
    return request({
        url: '/blog/material/verify/deleteUserCollectionMaterial',
        method: 'DELETE',
        data
    })
}