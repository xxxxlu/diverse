import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 使用类型断言来避免TypeScript错误
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
} as any)
