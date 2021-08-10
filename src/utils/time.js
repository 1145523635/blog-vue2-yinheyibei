/*
 * @Descripttion: 有关时间处理的函数
 * @Author: 银河以北
 * @Date: 2021-08-10 22:47:31
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-10 23:18:50
 */


/**
 * @Description: 判断时间过去了几天、几分钟、几秒钟  2021-08-09 21:52:06标准时间格式
 * @Author: 银河以北
 * @Date: 2021-08-10 22:50:28
 * @param {*}
 * @return {*}
 */
export function getPastTimes(time) {

    //服务器返回时间
    const itemTime = new Date(time).getTime()

    //当前时间
    const nowTime = new Date().getTime()
    let timeInterval = Math.ceil((nowTime - itemTime) / 1000)
    let resultTime = '刚刚'
    if (timeInterval < 60) {
        resultTime = '刚刚'
    } else if (timeInterval < 3600) {
        resultTime = Math.ceil(timeInterval / 60) + '分钟前'
    } else if (timeInterval < 3600 * 12) {
        resultTime = Math.ceil(timeInterval / 3600) + '小时前'
    } else if (timeInterval > 3600 * 12 && timeInterval < 3600 * 12 * 2) {
        resultTime = '今天'
    } else if (timeInterval > 3600 * 12 * 2 && timeInterval < 3600 * 12 * 4) {
        resultTime = '昨天'
    } else if (timeInterval > 3600 * 12 * 4 && timeInterval < 3600 * 12 * 6) {
        resultTime = '前天'
    } else if (timeInterval > 3600 * 12 * 6) {
        resultTime = `${Math.round(timeInterval/86400)}天前`
    }
    return resultTime
}