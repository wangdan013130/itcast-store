// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MyAxios from './pulign/MyAxios.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import moment from 'moment'
import MyBrands from './components/MyBrands.vue'
Vue.config.productionTip = false
Vue.use(MyAxios)
// 注册 ElementUI 插件
Vue.use(ElementUI)
// 全局 日期格式化
Vue.filter('getTime', (v, iframe) => {
  return moment(v).format(iframe)
})
// 自定义全局面包屑组件
Vue.component('MyBrand', MyBrands)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
