/*
 * @Descripttion: 访客信息
 * @Author: 银河以北
 * @Date: 2021-06-11 20:42:10
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-10-25 22:13:38
 */

const visitor = {


    state: {
        //访客ID
        visitorId: undefined,

        //访客信息
        visitorInfo: {}
    },

    mutations: {

        //设置访客ID
        SET_VISITOR_ID: (state, visitorId) => {
            state.visitorId = visitorId
        },

        //设置访客信息
        SET_VISITOR_INFO: (state, visitorInfo) => {
            state.visitorInfo = visitorInfo
        }
    },


}

export default visitor