/*
 * @Descripttion: 前台基本默认配置
 * @Author: 银河以北
 * @Date: 2021-06-11 19:53:27
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-11 22:55:37
 */


export default {
    baseURL: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8002/index.php' : 'http://127.0.0.1:8002/index.php', // 开发环境 基本请求路径,
    baseImg: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8002/' : 'http://127.0.0.1:8002/', // 开发环境 图片基础访问路径
    uploadImgUrl: '/blog/common/uploadImages', // 上传图片的接口
    module: 'blog', // 上传时携带的 模块表标识
    articleTag: 'md', //md上传图片时需要携带的标识
}