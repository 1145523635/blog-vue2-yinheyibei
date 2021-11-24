/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-07-20 22:02:52
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-11-15 19:48:14
 */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        disableHostCheck: true,
        //自动打开浏览器
        open: true
    },
    chainWebpack(config) {


        //提高第一屏加载速度
        config.plugin('preload').tap(() => [{
            rel: 'preload',
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: 'initial'
        }])

        //配置svg图标
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },


}