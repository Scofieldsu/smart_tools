import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations.js'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  count: 10,
  centerRightWidth: 230,
  api_url: 'http://192.168.1.230:5050/api'
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
