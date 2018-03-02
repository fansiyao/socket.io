// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api'
import http from '../config/http'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from  'vue-infinite-scroll'
import {currency} from './assets/util/currency'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VIscroll from 'viscroll';
import Vuex from 'vuex'
Vue.use(Vuex);
Vue.use(infiniteScroll);
Vue.filter("currency",currency);
Vue.config.productionTip = false;
Vue.use(VueLazyLoad,{
  loading:'static/loading-svg/loading-bars.svg',
  try:3
});
Vue.prototype.$http = http;

Vue.use(api);

Vue.use(ElementUI);
Vue.use(VIscroll, {
  mouseWheel: true,
  click: false,
  preventDefault: true,
  tap: false,
  bounce: false,
  disableTouch: true
});

const store=new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0,
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName=nickName
    },
    updateCartCount(state,cartCount){
      state.cartCount+=cartCount;
    },
    initCartCount(state,cartCount){
      state.cartCount=cartCount;
    }

  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
