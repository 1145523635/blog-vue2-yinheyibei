/*
 * @Descripttion: 前台基本默认配置
 * @Author: 银河以北
 * @Date: 2021-06-11 19:53:27
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-09-05 16:58:57
 */


export default {
    baseURL: process.env.NODE_ENV == 'development' ? 'http://yinheyibei.serve.yinheyibei.cn/' : 'http://yinheyibei.serve.yinheyibei.cn/', // 开发环境 基本请求路径,
    baseImg: process.env.NODE_ENV == 'development' ? 'http://yinheyibei.serve.yinheyibei.cn/' : 'http://yinheyibei.serve.yinheyibei.cn/', // 开发环境 图片基础访问路径
    websocketUrl: 'ws://8.131.60.32:2348', //长链接接口
    uploadImgUrl: '/blog/common/uploadImages', // 上传图片的接口
    module: 'blog', // 上传时携带的 模块表标识
    articleTag: 'md', //md上传图片时需要携带的标识
}