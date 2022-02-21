/*
 * @Descripttion: 有关时间处理的函数
 * @Author: 银河以北
 * @Date: 2021-08-10 22:47:31
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-02-18 16:41:10
 */


/**
 * @Description: 判断时间过去了几天、几分钟、几秒钟  2021-08-09 21:52:06标准时间格式
 * @Author: 银河以北
 * @Date: 2021-08-10 22:50:28
 * @param {*}
 * @return {*}
 */
export function getPastTimes(time = getCurrentTime()) {
    //服务器返回时间 || 默认时间
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
        resultTime = `${Math.round(timeInterval / 86400)}天前`
    }
    return resultTime
}

/**
 * @Description: 获取当前时间 格式:yyyy-MM-dd HH:MM:SS 
 * @Author: 银河以北
 * @Date: 2021-09-08 22:28:52
 * @param {*}
 * @return {*}
 */
export function getCurrentTime() {
    let date = new Date(); //当前时间
    let month = zeroFill(date.getMonth() + 1); //月
    let day = zeroFill(date.getDate()); //日
    let hour = zeroFill(date.getHours()); //时
    let minute = zeroFill(date.getMinutes()); //分
    let second = zeroFill(date.getSeconds()); //秒
    let curTime = date.getFullYear() + "-" + month + "-" + day +
        " " + hour + ":" + minute + ":" + second;
    return curTime;
}

/**
 * @Description: 时间格式补零
 * @Author: 银河以北
 * @Date: 2021-09-08 22:28:04
 * @param {*} i
 * @return {*}
 */
function zeroFill(i) {
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}