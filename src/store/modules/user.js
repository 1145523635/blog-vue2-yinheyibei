/*
 * @Descripttion: 
 * @Author: 银河以北
 * @Date: 2021-06-11 20:42:10
 * @LastEditors: 银河以北
 * @LastEditTime: 2021-06-13 17:16:56
 */

//引入登录方法
import { login, getUserInfo } from "@/api/login/index";

//设置token
import { setToken } from '@/utils/auth'
const user = {
    state: {
        //token
        token: '',

        //用户信息
        info: undefined
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INFO: (state, info) => {
            state.info = info
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                const data = { account: userInfo.account, password: userInfo.password }
                login(data).then(response => {
                    //登录时发生错误
                    if (!response) {
                        resolve(false)
                    }
                    const token = response.data
                        //vuex存token
                    commit('SET_TOKEN', token)

                    //本地存token
                    setToken(token)

                    //成功登录
                    resolve(true)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const result = response.data

                    //在vueX设置token
                    if (result.user) {
                        commit('SET_INFO', result)
                    } else {
                        reject(new Error('getInfo: roles must be a non-null array !'))
                    }
                    //返回请求信息
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({ commit, state }) {
            return new Promise((resolve) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_INFO', undefined)
                    storage.remove(ACCESS_TOKEN)
                    resolve()
                }).catch(() => {
                    resolve()
                }).finally(() => {})
            })
        }

    }
}

export default user