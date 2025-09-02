import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Configure conversion settings
Vue.prototype.$converter = {
    api: 'https://heicto.onrender.com/convert/heic-to-jpeg/',
    settings: {
        acceptedTypes: ['.heic'],
        maxSize: 10 * 1024 * 1024
    }
}

new Vue({
    render: h => h(App),
}).$mount('#app')

