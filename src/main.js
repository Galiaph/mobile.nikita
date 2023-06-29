import { createApp } from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import axios from 'axios'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/light-bootstrap-dashboard.scss'
import './assets/css/demo.css'

// const settings = {
//     apiKey: '28cc09a4-4cc8-4c92-bd21-2ee1e9d192b8',
//     lang: 'ru_RU',
//     coordorder: 'latlong',
//     enterprise: false,
//     version: '2.1'
// }

const authInterceptor = (config) => {
    const token = localStorage.getItem('token')
  
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
  
    return config
}

const errorInterceptor = async error => {
    // check if it's a server error
    if (!error.response) {
        console.error('**Network/Server error')
        console.log(error.response)
        return Promise.reject(error)
    }

    console.log(error.response.status)
    // all the other error responses
    switch (error.response.status) {
        case 400:
            console.log('my error 400')
            console.error(error.response.status, error.message)
            break
        case 401: // authentication error, logout the user
            // console.log('my error 401')
            // console.error(error.response.status, error.message)
            await store.dispatch('logout')
            router.push('/login')
            break
        case 403:
            // console.log('my error 403')
            // console.error(error.response.status, error.message)
            await store.dispatch('logout')
            router.push('/login')
            break
        //
        // default:
        //   console.error(error.response.status, error.message)
    }
    return Promise.reject(error)
}

axios.interceptors.request.use(authInterceptor)
axios.interceptors.response.use(undefined, errorInterceptor)
//.use(ymapPlugin, settings)
createApp(App).use(store).use(router).use(HighchartsVue).mount('#app')
