// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import Vuex from 'vuex'
import store from './store' // vuex config
import * as filters from './filters'
import mixins from './mixins'
import axios from 'axios' 
Vue.prototype.axios = axios  
import Navigation from 'vue-navigation'   
import Cube from 'cube-ui' 
Vue.use(Cube) 
import  { ConfirmPlugin, AlertPlugin, ToastPlugin,DatetimePlugin,LoadingPlugin } from 'vux' 
Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin, {position: 'middle'})
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin) 
Vue.use(Navigation, {router})
// sync the router with the vuex store.
// this registers `store.state.route`
// sync(store, router) 
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
}) 
FastClick.attach(document.body);
// register global mixins.
Vue.mixin(mixins)
Vue.config.productionTip = false

// 引用瀑布流
// import waterfall from 'vue-waterfall2'
// Vue.use(waterfall)
// 引用手势滑动
import './libs/touch.js' 

// 引用外部js
Vue.component('remote-script', { 
  render: function (createElement) {
      var self = this;
      return createElement('script', {
          attrs: {
              type: 'text/javascript',
              src: this.src
          },
          on: {
              load: function (event) {
                  self.$emit('load', event);
              },
              error: function (event) {
                  self.$emit('error', event);
              },
              readystatechange: function (event) {
                  if (this.readyState == 'complete') {
                      self.$emit('load', event);
                  }
              }
          }
      });
  },

  props: {
      src: {
          type: String,
          required: true
      }
  }
});
 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
