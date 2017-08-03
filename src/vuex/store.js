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
    gitlaburl: 'http://10.46.59.55',
    path: '/oauth/authorize?',
    params: {
      client_id: '7a399849bf58eb8f983728b6fdd543c453e7c792d0d10b2b87ba88a7da6da3d1',
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
