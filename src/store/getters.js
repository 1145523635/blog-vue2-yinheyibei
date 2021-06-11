/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-11 20:47:50
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-11 21:53:04
 */
const getters = {

    //获取用户token
    token: state => state.user.token,
    userInfo: state => state.user.info

}

export default getters