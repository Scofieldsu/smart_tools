import VueRouter from 'vue-router'
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import commonJs from '../util/common'

import Home from '../components/Home.vue'
import LogIn from '../components/LogInAndSignUp/LogIn.vue'
import SignUp from '../components/LogInAndSignUp/SignUp.vue'
import ExchangeRate from '../components/NavForTools/ExchangeRate.vue'
import Overview from '../components/NavForTools/Overview.vue'

Vue.use(VueRouter)
NProgress.configure({
  showSpinner: false
})

const routes = [
  {
    path: '/tools',
    name: '所有工具',
    show: false,
    component: Home,
    children: [
      { path: '/tools/alltools', name: '所有工具', component: Overview, show: false }
    ]
  },
  { path: '/life',
    name: '生活服务',
    show: true,
    component: Home,
    icon: 'fa fa-navicon',
    children: [
      { path: '/life/exchange_rate', name: '汇率换算', component: ExchangeRate, show: true }
    ]
  },
  { path: '/', redirect: '/LogIn' },
  {
    path: '/LogIn',
    component: LogIn,
    name: 'LogIn'
  },
  {
    path: '/SignUp',
    component: SignUp,
    name: 'SignUp'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let cookieMaker = commonJs.cookieMaker
  if (!cookieMaker.get('name') && !cookieMaker.get('password')) {
    if (to.name === 'LogIn' || to.name === 'SignUp') {
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
  next()
})

router.afterEach(transition => {
  NProgress.done()
})

let cookieMaker = commonJs.cookieMaker
if (!cookieMaker.get('name') || !cookieMaker.get('password')) {
  router.push('/LogIn')
}

export default router
