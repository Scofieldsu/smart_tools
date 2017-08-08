import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations.js'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  count: 10,
  centerRightWidth: 230,
  api_url: 'http://192.168.1.230/api',
  gitlab_info: {
    gitlaburl: 'http://192.168.5.10',
    path: '/oauth/authorize?',
    params: {
      client_id: 'a164506151fbd065a97d3cd9654ee0e37f80ffe81616a8311c320022a097e2c3',
      redirect_uri: 'http://192.168.1.230/login/gitlab',
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
