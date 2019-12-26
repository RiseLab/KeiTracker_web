import Vue from 'vue'
import Router from 'vue-router'
import GlobalMap from '@/components/GlobalMap'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import TermsAndConditions from '@/components/TermsAndConditions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GlobalMap',
      component: GlobalMap
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/terms-and-conditions',
      name: 'TermsAndConditions',
      component: TermsAndConditions
    }
  ]
})
