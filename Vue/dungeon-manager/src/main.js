import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-weather.js'

Vue.config.productionTip = false

let data = {
	weather: mock
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
