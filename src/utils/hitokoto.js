/*
 * @Descripttion: 一言开发者中心
 * @Author: 银河以北
 * @Date: 2021-11-07 17:07:54
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-11-07 18:48:25
 */

import axios from 'axios'
export function getHitokoto() {
    return new Promise((resolve, reject) => {
        let typeList = "abcdefghijkl";
        let len = typeList.length;
        let type = "";
        type = typeList.charAt(Math.floor(Math.random() * len));
        axios.get(`https://v1.hitokoto.cn/?c=${type}&encode=json`).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })

}