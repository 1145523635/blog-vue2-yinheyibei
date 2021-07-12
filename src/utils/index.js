/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-12 17:31:48
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-07-12 17:36:50
 */

import { getActiveSheet, getTransType, getRouteName, getRouteName, getRouteName } from 'xxx/xx'
// && col === 6 && row === 1
export function getBolean(col, row) {

    if (getActiveSheet().templateId === '79b012f0aba411eaae7bbdf62966b4e3' && getTransType() === 'zgh-input' && getRouteName() === 'PFS_ZGH_SUM' && getRouteName() != 'PFS_ZGH_EDIT_HZTB' && col === 6 && row === 1) {
        return true
    } else {
        return false
    }

}