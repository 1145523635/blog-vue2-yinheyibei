/*
 * @Descripttion: 所有含用户信息的路由
 * @Author: 银河以北
 * @Date: 2021-08-11 15:47:00
 * @LastEditors: 银河以北
 * @LastEditTime: 2022-04-10 23:16:30
 */

//引入用户信息模块
import UserInfo from '@/layout/userInfo'
export const layoutUserInfo = [{
    path: 'home',
    name: 'Home',
    meta: {
        title: '资源推荐',
        keepAlive: true
    },
    components: {
        default: () =>
            import('@/views/home/index.vue'),
        userInfo: UserInfo
    }
}, {
    path: 'resources',
    name: 'Resources',
    meta: {
        title: '妙笔生花',
        keepAlive: true
    },
    components: {
        default: () =>
            import('@/views/resources/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'achievements',
    name: 'Achievements',
    meta: {
        title: '奇思妙想',
        keepAlive: true
    },
    components: {
        default: () =>
            import('@/views/achievements/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'release',
    name: 'Release',
    meta: {
        title: '发布文章',
        keepAlive: true
    },
    components: {
        default: () =>
            import('@/views/release/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'readArticle',
    name: 'ReadArticle',
    meta: {
        title: '文章阅读',
        keepAlive: false
    },
    components: {
        default: () =>
            import('@/views/readArticle/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'materialRecommend',
    name: 'MaterialRecommend',
    meta: {
        title: '资源推荐',
        keepAlive: false
    },
    components: {
        default: () =>
            import('@/views/material/materialRecommend/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'materialResult',
    name: 'MaterialResult',
    meta: {
        title: '推荐结果',
        keepAlive: false
    },
    components: {
        default: () =>
            import('@/views/material/materialResult/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'materialDetails',
    name: 'MaterialDetails',
    meta: {
        title: '资源详情',
        keepAlive: false
    },
    components: {
        default: () =>
            import('@/views/material/materialDetails/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'disclaimers',
    name: 'Disclaimers',
    meta: {
        title: '免责声明',
        keepAlive: true
    },
    components: {
        default: () =>
            import('@/views/disclaimers/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'message',
    name: 'Message',
    meta: {
        title: '意见反馈',
        keepAlive: true
    },
    components: {
        default: () =>
            import('@/views/message/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'about',
    name: 'About',
    meta: {
        title: '关于我们',
        keepAlive: true
    },
    components: {
        default: () =>
            import('@/views/about/index.vue'),
        userInfo: UserInfo
    }
},
{
    path: 'retrievePassword',
    name: 'RetrievePassword',
    meta: {
        title: '找回密码',

    },
    components: {
        default: () =>
            import('@/views/retrievePassword/index.vue'),
        userInfo: UserInfo
    }
}
]