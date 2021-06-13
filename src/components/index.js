import LoginDialog from './LoginDialog.vue'

const Login = {
    install(Vue, options) {
        Vue.prototype.$loginPopup = function(options) {
            const LoginConstructor = Vue.extend(LoginDialog)
            const div = document.createElement('div')
            document.body.appendChild(div)
            const vm = new LoginConstructor({
                propsData: options,

            }).$mount(div)
            vm.innerShowPopup = true

        }
    }
}

export default Login