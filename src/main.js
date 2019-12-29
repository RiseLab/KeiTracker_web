// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/firebase'
import { rtdbPlugin } from 'vuefire'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'flag-icon-css/css/flag-icon.css'

import VueMarkdown from 'vue-markdown'
Vue.component('vue-markdown', VueMarkdown)

Vue.use(rtdbPlugin)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify(),
  components: { App },
  template: '<App/>'
})
