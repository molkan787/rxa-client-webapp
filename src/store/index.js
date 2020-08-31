import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: {
      signedIn: false,
      token: null,
      user: null,
    },
    entryCategories: [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
