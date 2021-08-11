/*
 * @Descripttion: 所有含用户信息的路由
 * @Author: 银河以北
 * @Date: 2021-08-11 15:47:00
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-11 15:50:35
 */
export const layoutUserInfo = [{
        path: 'home',
        name: 'Home',
        meta: { title: '时光笔记' },
        component: () =>
            import ('@/views/home/index.vue'),
    }, {
        path: 'resources',
        name: 'resources',
        meta: { title: '编程资源' },
        component: () =>
            import ('@/views/resources/index.vue')
    },
    {
        path: 'blogAbout',
        name: 'blogAbout',
        meta: { title: '关于' },
        component: () =>
            import ('@/views/blogAbout/index.vue')
    },
    {
        path: 'release',
        name: 'release',
        meta: { title: '关于' },
        component: () =>
            import ('@/views/release/index.vue')
    },
    {
        path: 'readArticle',
        name: 'readArticle',
        meta: {
            title: '文章阅读'
        },
        component: () =>
            import ('@/views/readArticle/index.vue')

    }
]