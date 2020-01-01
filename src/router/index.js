import Vue from 'vue'
import Router from 'vue-router'
import GlobalMap from '@/components/GlobalMap'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import TermsAndConditions from '@/components/TermsAndConditions'
import RouterView from '@/components/RouterView'
import { i18n } from '@/main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/privacy-policy',
      redirect: '/en/privacy-policy'
    },
    {
      path: '/terms-and-conditions',
      redirect: '/en/terms-and-conditions'
    },
    {
      path: '*',
      redirect: '/en'
    },
    {
      path: '/:lang',
      name: 'Home',
      component: RouterView,
      beforeEnter (to, from, next) {
        const lang = to.params.lang
        if (!['ru', 'en'].includes(lang)) return next('en')

        if (i18n.locale !== lang) {
          i18n.locale = lang
        }

        return next()
      },
      children: [
        {
          path: '/:lang',
          name: 'GlobalMap',
          component: GlobalMap
        },
        {
          path: 'privacy-policy',
          name: 'PrivacyPolicy',
          component: PrivacyPolicy
        },
        {
          path: 'terms-and-conditions',
          name: 'TermsAndConditions',
          component: TermsAndConditions
        }
      ]
    }
  ]
})
