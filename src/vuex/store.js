import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations.js'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  count: 10,
  centerRightWidth: 230,
  api_url: 'http://192.168.1.230:5050/api',
  gitlab_info: {
    gitlaburl: 'http://10.42.135.82',
    path: '/oauth/authorize?',
    params: {
      client_id: '2e78f1c6c3311767da17fd17fb86bdc4d70426a48e40d81da5dcf57b5fb865c0',
      redirect_uri: 'http://192.168.1.230:5050/login/gitlab',
      response_type: 'code',
      state: 'oneplatform'
    }
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store
