// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import * as filters from './filters' // 全局vue filter
// import Icon from 'vue-awesome'

Vue.config.productionTip = false

// 注册全局 filter
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

Vue.use(ElementUI)
// Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
