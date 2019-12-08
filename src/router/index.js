import Vue from 'vue'
import Router from 'vue-router'
import GlobalMap from '@/components/GlobalMap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GlobalMap',
      component: GlobalMap
    }
  ]
})
