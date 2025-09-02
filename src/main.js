import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$apiConfig = {
    convertEndpoint: 'https://heicto.onrender.com/convert-heic-',
    acceptedTypes: ['.heic']
}

new Vue({
  render: h => h(App),
}).$mount('#app')

