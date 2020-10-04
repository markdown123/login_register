import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store'

axios.defaults.withCredentials = true

axios.defaults.baseURL = 'http://localhost:3000/users'

Vue.prototype.$request = axios

axios.interceptors.request.use(function(config) {
    // 这里的config包含每次请求的内容
    //   if(window.localStorage.getItem('clearToken')) {
    //       window.localStorage.removeItem('token')
    //   }
    const token = window.localStorage.getItem('token')
    if (token) {
        // 添加headers
        config.headers.Authorization = `${token}`
            // config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    } else {}
    return config
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')