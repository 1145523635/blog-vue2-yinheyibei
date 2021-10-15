/*
 * @Descripttion: 资源分类
 * @Author: 银河以北
 * @Date: 2021-06-11 19:52:42
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-14 22:49:01
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
        url: '/blog/material/release/addNewMaterialRecommend',
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