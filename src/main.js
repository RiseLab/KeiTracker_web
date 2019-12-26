// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/firebase'
import { rtdbPlugin } from 'vuefire'
import Vue from 'vue'
import App from './App'
import router from './router'

import VueMarkdown from 'vue-markdown'
Vue.component('vue-markdown', VueMarkdown)

Vue.use(rtdbPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
