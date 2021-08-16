/*
 * @Descripttion: 所有含用户信息的路由
 * @Author: 银河以北
 * @Date: 2021-08-11 15:47:00
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-16 00:53:32
 */
export const layoutUserInfo = [{
        path: 'home',
        name: 'Home',
        meta: {
            title: '时光笔记',
            keepAlive: true
        },
        component: () =>
            import ('@/views/home/index.vue'),
    }, {
        path: 'resources',
        name: 'Resources',
        meta: {
            title: '编程资源',
            keepAlive: true
        },
        component: () =>
            import ('@/views/resources/index.vue')
    },
    {
        path: 'blogAbout',
        name: 'BlogAbout',
        meta: {
            title: '关于',
            keepAlive: true
        },
        component: () =>
            import ('@/views/blogAbout/index.vue')
    },
    {
        path: 'release',
        name: 'Release',
        meta: {
            title: '发布文章',
            keepAlive: true
        },
        component: () =>
            import ('@/views/release/index.vue')
    },
    {
        path: 'readArticle',
        name: 'ReadArticle',
        meta: {
            title: '文章阅读',
            keepAlive: false
        },
        component: () =>
            import ('@/views/readArticle/index.vue')

    }
]