/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-08-11 15:52:19
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-08-11 15:53:16
 */
export const layoutUserMenu = [{
    path: '/userInfo',
    name: 'UserINfo',
    meta: { title: '用户信息' },
    redirect: '/userInfo/releaseList',
    component: () =>
        import ('@/views/user/userInfo.vue'),
    children: [{
            path: 'personal',
            name: 'Personal',
            meta: { title: '个人资料' },
            redirect: '/userInfo/personal/baseSetting',
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
            path: 'collection',
            name: 'Collection',
            meta: { title: '用户收藏' },
            component: () =>
                import ('@/views/user/userPages/collection/index.vue'),
        },
        {
            path: 'comment',
            name: 'Comment',
            meta: { title: '用户评论' },
            component: () =>
                import ('@/views/user/userPages/comment.vue'),
        },
        {
            path: 'follow',
            name: 'Follow',
            meta: { title: '用户关注' },
            component: () =>
                import ('@/views/user/userPages/follow.vue'),
        },
        {
            path: 'releaseList',
            name: 'ReleaseList',
            meta: { title: '用户发布' },
            component: () =>
                import ('@/views/user/userPages/release/index.vue'),
        },
        {
            path: 'articleNews',
            name: 'ArticleNews',
            meta: { title: '消息通知' },
            component: () =>
                import ('@/views/user/userPages/articleNews/index.vue'),
        }
    ]
}]