/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-08-11 15:52:19
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-05-04 19:59:00
 */
export const layoutUserMenu = [{
    path: '/userInfo',
    name: 'UserInfo',
    meta: { title: '用户信息' },
    redirect: '/userInfo/:userId/releaseList',
    component: () =>
        import ('@/views/user/userInfo.vue'),
    children: [{
            path: ':userId/personal',
            name: 'Personal',
            meta: { title: '个人资料' },
            redirect: '/userInfo/:userId/personal/baseSetting',
            component: () =>
                import ('@/views/user/userPages/personal/index.vue'),
            children: [{
                    path: 'baseSetting',
                    name: 'BaseSetting',
                    meta: {
                        title: '基本配置',
                        routerParent: "personal" //处理在子级页面渲染时 父级没有动态类名
                    },
                    component: () =>
                        import ('@/views/user/userPages/personal/baseSetting.vue')
                },
                {
                    path: 'addressSetting',
                    name: 'AddressSetting',
                    meta: {
                        title: '基本配置',
                        routerParent: "personal" //处理在子级页面渲染时 父级没有动态类名
                    },
                    component: () =>
                        import ('@/views/user/userPages/personal/addressSetting.vue')
                },
                {
                    path: 'securitySetting',
                    name: 'SecuritySetting',
                    meta: {
                        title: '安全配置',
                        routerParent: "personal"
                    },
                    component: () =>
                        import ('@/views/user/userPages/personal/securitySetting.vue')
                }
            ]
        },
        {
            path: ':userId/releaseList',
            name: 'ReleaseList',
            meta: { title: '用户发布' },
            component: () =>
                import ('@/views/user/userPages/release/index.vue'),
        },
        {
            path: ':userId/collection',
            name: 'Collection',
            meta: { title: '用户收藏' },
            component: () =>
                import ('@/views/user/userPages/collection/index.vue'),
        },
        {
            path: ':userId/material',
            name: 'Material',
            meta: { title: '推荐资源' },
            component: () =>
                import ('@/views/user/userPages/material/index.vue'),
        },
        {
            path: ':userId/follow',
            name: 'Follow',
            meta: { title: '用户关注' },
            component: () =>
                import ('@/views/user/userPages/follow/index.vue'),
        },
        {
            path: ':userId/articleNews',
            name: 'ArticleNews',
            meta: { title: '消息通知' },
            component: () =>
                import ('@/views/user/userPages/articleNews/index.vue'),
        },
        {
            path: ':userId/personalData',
            name: 'PersonalData',
            meta: { title: '个人资料' },
            component: () =>
                import ('@/views/user/userPages/personalData/index.vue'),
        }
    ]
}]