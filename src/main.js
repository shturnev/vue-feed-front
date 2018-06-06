// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import {store} from './store';
import VueCkeditor from 'vue-ckeditor2';


import './assets/styles/main.scss';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueCkeditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
