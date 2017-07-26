import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations.js'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  count: 10,
  centerRightWidth: 230,
  api_url: 'http://localhost:5050/api',
  EditService: {}
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store
