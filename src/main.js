// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/common.less'

Vue.use(Element,{size:'mini'}); //medium small mini

Vue.config.productionTip = false

//全局路由前置守卫
router.beforeEach((to,from,next)=>{
  console.log('全局路由前置守卫 beforeEach to:',to,'from:',from);
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
