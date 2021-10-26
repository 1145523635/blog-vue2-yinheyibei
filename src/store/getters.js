/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-11 20:47:50
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-25 22:14:07
 */
const getters = {

    //获取用户token
    token: state => state.user.token,

    //获取用户token
    hasLogin: state => {
        return !!state.user.token
    },

    //获取用户信息
    userInfo: state => state.user.info,

    //获取用户ID
    userId: state => state.user.info.user.id,

    //访客用户ID
    visitorId: state => state.visitor.visitorId,

    //访客信息
    visitorInfo: state => state.visitor.visitorInfo

}

export default getters