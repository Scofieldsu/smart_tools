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
import AddService from '../components/NavForTools/AddService.vue'
import ShowService from '../components/NavForTools/ShowService.vue'
import ShowNotice from '../components/NavForTools/ShowNotice.vue'
import UserAccess from '../components/NavForTools/UserAccess.vue'
import UserSettings from '../components/NavForTools/UserSettings.vue'
import Transformation from '../components/NavForTools/Transformation.vue'
import LoginDebug from '../components/LogInAndSignUp/LoginDebug.vue'
import LeaveMessage from '../components/NavForTools/LeaveMessage.vue'
import UserTips from '../components/NavForTools/UserTips.vue'
import Test from '../components/NavForTools/Test.vue'
import Favorites from '../components/NavForTools/Favorites.vue'
import ChartService from '../components/NavForTools/ChartService.vue'
import Markdown from '../components/NavForTools/Markdown.vue'
Vue.use(VueRouter)
NProgress.configure({
  showSpinner: false
})

const routes = [

  { path: '/yours',
    name: '你的首页',
    show: true,
    component: Home,
    icon: 'fa fa-home',
    children: [
      { path: '/yours/all_tools', name: '服务', icon: 'fa fa-bullhorn', component: Overview, show: true },
      { path: '/yours/favorites', name: '收藏', icon: 'fa fa-star', component: Favorites, show: true },
      { path: '/yours/notices', name: '动态', icon: 'fa fa-info-circle', component: ShowNotice, show: true },
      { path: '/yours/tips', name: '便签', icon: 'fa fa-pencil-square-o', component: UserTips, show: false },
      { path: '/yours/settings', name: '个人设置', icon: 'fa fa-lock', component: UserSettings, show: true }
    ]
  },
  { path: '/manager',
    name: '服务管理',
    show: true,
    component: Home,
    icon: 'fa fa-cog',
    children: [
      { path: '/manager/add_service', name: '发布信息', icon: 'fa fa-upload', component: AddService, show: true },
      { path: '/manager/public_notice', name: '发布公告', icon: 'fa fa-tag', component: Markdown, show: true },
      { path: '/manager/show_service', name: '服务列表', icon: 'fa fa-table', component: ShowService, show: true },
      { path: '/manager/chart_service', name: '图表统计', icon: 'fa fa-bar-chart-o', component: ChartService, show: true },
      { path: '/manager/user_access', name: '权限管理', icon: 'fa fa-user', component: UserAccess, show: true }
    ]
  },
  { path: '/test',
    name: '实验室',
    show: true,
    component: Home,
    icon: 'fa fa-gift',
    children: [
      { path: '/test/exchange_rate', name: '汇率换算', icon: 'fa fa-usd', component: ExchangeRate, show: false },
      { path: '/test/apis', name: '开发测试', icon: 'fa fa-tumblr-square', component: Test, show: true },
      { path: '/test/tools', name: '工具箱', icon: 'fa fa-wrench', component: Transformation, show: true },
      { path: '/test/message', name: '留言板', icon: 'fa  fa-envelope', component: LeaveMessage, show: true }
    ]
  },
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: LogIn,
    name: 'login'
  },
  {
    path: '/login/debug',
    component: LoginDebug,
    name: 'login_debug'
  },
  {
    path: '/sign_up',
    component: SignUp,
    name: 'sign_up'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let cookieMaker = commonJs.cookieMaker
  if (!cookieMaker.get('name') && !cookieMaker.get('password')) {
    if (to.name === 'login' || to.name === 'sign_up') {
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

// let cookieMaker = commonJs.cookieMaker
if (!window.sessionStorage.getItem('login')) {
  router.push('/login')
}

export default router
